import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin2faCode } from '../entities/code-adm.entity';

@Injectable()
export class CodeAdmRepository {
  constructor(
    @InjectRepository(Admin2faCode)
    private readonly codeAdmRepo: Repository<Admin2faCode>,
  ) {}

  findAll(): Promise<Admin2faCode[]> {
    return this.codeAdmRepo.find({
      relations: ['adm'], // carregar a entidade adm relacionada
    });
  }

  findById(id: number): Promise<Admin2faCode | null> {
    return this.codeAdmRepo.findOne({
      where: { id },
      relations: ['adm'],
    });
  }

  findByCode(code: string): Promise<Admin2faCode | null> {
    return this.codeAdmRepo.findOne({
      where: { code },
      relations: ['adm'],
    });
  }

  async createCode(codeData: Partial<Admin2faCode>): Promise<Admin2faCode> {
    const newCode = this.codeAdmRepo.create(codeData);
    return this.codeAdmRepo.save(newCode);
  }

  async updateCode(id: number, codeData: Partial<Admin2faCode>): Promise<Admin2faCode | null> {
    await this.codeAdmRepo.update(id, codeData);
    return this.findById(id);
  }

  async deleteCode(id: number): Promise<void> {
    await this.codeAdmRepo.delete(id);
  }
}
