import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor( private readonly usersService: UsersService) {}

    async use(req: any, res: any, next: () => void) {
        const { authCode } = req.query;
        if (!authCode) {
            return res.status(401).send({ error: 'authCode não encontrado' });
        }
        const userId = await this.usersService.findOne(authCode);
        if (!userId) {
            return res.status(401).send({ error: 'authCode inválido' });
        }
        req.userId = userId;
        console.log('AuthMiddleware executado');
        next();
    }
}