import { Injectable } from '@nestjs/common';
import { AdmRepository } from 'src/database/repositories/adm.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(private readonly admRepository: AdmRepository) {}
  async validateAdmin(username: string, userPassword: string): Promise<{ id: number, email: string } | null> {
    const admin = await this.admRepository.findByUser(username);

    if (!admin) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(userPassword, admin.userPassword);

    if (!isPasswordValid) {
      return null;
    }

    return { id: admin.id, email: admin.email };
  }
}
