import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly redisService: RedisService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.query.authCode || req.headers['authorization']?.replace('Bearer ', '').trim();

    if (!token || typeof token !== 'string') {
      throw new UnauthorizedException('Token de autenticação não fornecido');
    }

    const session = await this.redisService.get<{ id: number; role: string }>(`auth:${token}`);
    if (!session) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
    req['user'] = session;

    next();
  }
}
