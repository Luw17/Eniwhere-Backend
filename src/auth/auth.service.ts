import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { StoresService } from '../stores/stores.service';
import { AdminsService } from '../admins/admins.service';
import { WorkersService } from '../workers/workers.service';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly StoresService: StoresService,
    private readonly adminsService: AdminsService,
    private readonly WorkersService: WorkersService,
    private readonly redisService: RedisService,
    private readonly emailService: EmailService,
  ) {}

  private sessions = new Map<string, { userId: number; expiresAt: number }>();

  async login(username: string, userPassword: string): Promise<{ id: number; role: string }> {
    const user = await this.validateUser({ username, userPassword });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    if (typeof user.id === 'number' && typeof user.email === 'string') {
      await this.sendTwoFactorCode(user.id, user.email, user.role);
    }

    return { id: user.id, role: user.role };
  }

  async sendTwoFactorCode(userId: number, email: string, role: string): Promise<void> {
    const code = this.generateCode();

    const data = JSON.stringify({ code, role });
    await this.redisService.set(`2fa:${userId}`, data, 300);

    await this.emailService.sendEmail({
      to: email,
      subject: 'Código de verificação',
      text: `Seu código de verificação é: ${code}`,
      html: `<p>Olá,</p><p>Seu <strong>código de verificação</strong> é: <b>${code}</b></p><p>Esse código é válido por 5 minutos.</p>`,
    });
  }

  private generateCode(length = 6): string {
    return Math.floor(Math.random() * 10 ** length)
      .toString()
      .padStart(length, '0');
  }

  async validateUser(user: { username: string; userPassword: string }) {
    const userData = await this.usersService.validateUser(user.username, user.userPassword);
    if (userData) {
      return { id: userData.id, role: 'user', email: userData.email };
    }

    const storeData = await this.StoresService.validateStore(user.username, user.userPassword);
    if (storeData) {
      return { id: storeData.id, role: 'store', email: storeData.email };
    }

    const workerData = await this.WorkersService.validateWorker(user.username, user.userPassword);
    if (workerData) {
      return { id: workerData.id, role: 'worker', email: workerData.email };
    }

    const admData = await this.adminsService.validateAdmin(user.username, user.userPassword);
    if (admData) {
      return { id: admData.id, role: 'admin', email: admData.email };
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

  async verifyTwoFactorCode(userId: number, code: string): Promise<string | null> {
    const key = `2fa:${userId}`;
    const data = await this.redisService.get<string>(key);

    if (!data) return null;

    const parsed = JSON.parse(data) as { code: string; role: string };

    if (parsed.code !== code) return null;

    await this.redisService.del(key);

    const token = uuidv4();

    const session = {
      id: userId,
      role: parsed.role,
    };

    await this.redisService.set(`auth:${token}`, session, 60 * 60 * 24);

    return "Bearer " +token;
  }
async forgotPassword(email: string): Promise<void> {
  const services = [
    { service: this.usersService, role: 'user' },
    { service: this.StoresService, role: 'store' },
    { service: this.WorkersService, role: 'worker' },
    { service: this.adminsService, role: 'admin' },
  ];

  let user: any = null;
  let role: string = '';

  for (const { service, role: currentRole } of services) {
    user = await service.findByEmail(email);
    if (user) {
      role = currentRole;
      break;
    }
  }

  if (!user) {
    throw new Error('Email não encontrado');
  }

  const resetToken = uuidv4();
  const data = JSON.stringify({ id: user.id, role });

  await this.redisService.set(`reset:${resetToken}`, data, 3600); // 1 hora

  await this.emailService.sendEmail({
    to: email,
    subject: 'Redefinição de Senha',
    html: `<p>Para redefinir sua senha, acesse o link abaixo:</p>
           <p><a href="http://localhost:3000/reset-password?token=${resetToken}">Redefinir Senha</a></p>
           <p>Este link é válido por 1 hora.</p>`,
  });
}
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const data = await this.redisService.get<string>(`reset:${token}`);
    if (!data) {
      throw new Error('Token inválido ou expirado');
    }

    const { id, role } = JSON.parse(data) as { id: number; role: string };

    const serviceMap = {
      user: this.usersService,
      store: this.StoresService,
      worker: this.WorkersService,
      admin: this.adminsService,
    };

    const service = serviceMap[role as keyof typeof serviceMap];

    if (!service) {
      throw new Error('Tipo de usuário inválido');
    }
    console.log(`Resetting password for ${role} with ID ${id}`);
    console.log(`New password: ${newPassword}`);
    await service.updatePassword(id, newPassword);

    await this.redisService.del(`reset:${token}`);
  }


}
