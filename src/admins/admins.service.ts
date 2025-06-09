import { Injectable } from '@nestjs/common';
import { AdmRepository } from 'src/database/repositories/adm.repository';
import { Admin } from 'typeorm';

@Injectable()
export class AdminsService {
    constructor(private readonly admRepository: AdmRepository) {}
    async validateAdmin(username: string, userPassword: string): Promise< { id: number, email: string } | null> {
        const admin = await this.admRepository.validateAdmin(username, userPassword);
        return admin;
    }
}
