import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeAdm } from '../entities/code-adm.entity';

@Injectable()
export class CodeAdmRepository {
  constructor(
    @InjectRepository(CodeAdm)
    private readonly codeAdmRepo: Repository<CodeAdm>,
  ) {}

  async findAll(): Promise<CodeAdm[]> {
    return await this.codeAdmRepo.find({
      relations: ['adm'], // se quiser carregar o adm junto
    });
  }

  async findById(id: number): Promise<CodeAdm | null> {
    return await this.codeAdmRepo.findOne({
      where: { id },
      relations: ['adm'],
    });
  }

  async findByCode(code: string): Promise<CodeAdm | null> {
    return await this.codeAdmRepo.findOne({
      where: { code },
      relations: ['adm'],
    });
  }

  async createCode(codeData: Partial<CodeAdm>): Promise<CodeAdm> {
    const newCode = this.codeAdmRepo.create(codeData);
    return await this.codeAdmRepo.save(newCode);
  }

  async updateCode(id: number, codeData: Partial<CodeAdm>): Promise<CodeAdm> {
    await this.codeAdmRepo.update(id, codeData);
    return await this.findById(id);
  }

  async deleteCode(id: number): Promise<void> {
    await this.codeAdmRepo.delete(id);
  }
}
