import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { StoresService } from '../stores/stores.service';
import { AdminsService } from '../admins/admins.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly StoresService: StoresService,
    private readonly adminsService: AdminsService,

  ) {}
  private sessions = new Map<string, { userId: number; expiresAt: number }>();

  /*
  async createSession(userId: number): Promise<string> {
    const authCode = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const expiresAt = Date.now() + 86400000;
    await this.usersService.updateAuthCode(userId, { authCode, authCodeExpiresAt: expiresAt });
    return authCode;
  }
    */
/*
async validateSession(authCode: string): Promise<boolean> {
    const user = await this.usersService.findOne({ where: { authCode } });
    if (!user || user.validadeCodigoAtivo < Date.now()) {
      return false; // Sess o inv lida ou expirada.
    }
    return true;
  }
  */

  async validateUser(user: { username: string; userPassword: string }) {
   
    const userId = await this.usersService.validateUser(user.username, user.userPassword);
    if (userId) {
      return userId;
    }
    const storeId = await this.StoresService.validateStore(user.username, user.userPassword);
    if (storeId) {
      return storeId;
    }
    const admId = await this.adminsService.validateAdmin(user.username, user.userPassword);
  /*
    const usuario = await this.usersService.getOneUser(userId);
    console.log(usuario.permissao);
    if(usuario.permissao == 'user'){ 
      return null}
    else{
    return userId;

    }  */
  }
  revokeSession(authCode: string): void {
    this.sessions.delete(authCode);
  }

}