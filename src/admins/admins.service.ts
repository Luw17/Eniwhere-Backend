import { Injectable } from '@nestjs/common';
import { AdmRepository } from 'src/database/repositories/adm.repository';

@Injectable()
export class AdminsService {
    constructor(private readonly admRepository: AdmRepository) {}
    async validateAdmin(username: string, userPassword: string): Promise<number | null> {
        const adminId = await this.admRepository.validateAdmin(username, userPassword);
        return adminId;
    }
}
