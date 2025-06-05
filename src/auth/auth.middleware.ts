import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly redisService: RedisService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header missing or invalid');
    }

    const token = authHeader.replace('Bearer ', '').trim();

    const session = await this.redisService.get<{ id: number; role: string }>(`auth:${token}`);
    if (!session) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    req['user'] = session;

    next();
  }
}
