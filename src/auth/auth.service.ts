import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { StoresService } from '../stores/stores.service';
import { AdminsService } from '../admins/admins.service';
import { WorkersService } from '../workers/workers.service';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly StoresService: StoresService,
    private readonly adminsService: AdminsService,
    private readonly WorkersService: WorkersService,
    private readonly redisService: RedisService,

  ) {}
  private sessions = new Map<string, { userId: number; expiresAt: number }>();

  async login(username: string, userPassword: string): Promise<string> {
    const user = await this.validateUser({ username, userPassword });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const token = uuidv4();

    const session = {
      id: user.id,
      role: user.role,
    };

    await this.redisService.set(`auth:${token}`, session, 60 * 60 * 24);

    return token;
  }
  async validateUser(user: { username: string; userPassword: string }) {
   
    const userId = await this.usersService.validateUser(user.username, user.userPassword);
    if (userId) {
      return {id: userId, role: 'user'};
    }
    const storeId = await this.StoresService.validateStore(user.username, user.userPassword);
    if (storeId) {
      return { id: storeId, role: 'store' };
    }
    const workerId = await this.WorkersService.validateWorker(user.username, user.userPassword);
    if (workerId) {
      return { id: workerId, role: 'worker' };
    }
    const admId = await this.adminsService.validateAdmin(user.username, user.userPassword);
    if (admId) {
      return { id: admId, role: 'admin' };
    }
    return null;
  }
  async logout(token: string): Promise<void> {
    const key = `auth:${token}`;

    const exists = await this.redisService.has(key);
    if (!exists) {
      throw new Error('Token inválido ou já expirado');
    }

    await this.redisService.del(key);
  }


}