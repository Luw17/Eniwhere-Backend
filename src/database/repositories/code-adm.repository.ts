import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TwoFCodeAdm } from '../entities/code-adm.entity';

@Injectable()
export class CodeAdmRepository {
  constructor(
    @InjectRepository(TwoFCodeAdm)
    private readonly codeAdmRepo: Repository<TwoFCodeAdm>,
  ) {}

  findAll(): Promise<TwoFCodeAdm[]> {
    return this.codeAdmRepo.find({
      relations: ['adm'], // carregar a entidade adm relacionada
    });
  }

  findById(id: number): Promise<TwoFCodeAdm | null> {
    return this.codeAdmRepo.findOne({
      where: { id },
      relations: ['adm'],
    });
  }

  findByCode(code: string): Promise<TwoFCodeAdm | null> {
    return this.codeAdmRepo.findOne({
      where: { code },
      relations: ['adm'],
    });
  }

  async createCode(codeData: Partial<TwoFCodeAdm>): Promise<TwoFCodeAdm> {
    const newCode = this.codeAdmRepo.create(codeData);
    return this.codeAdmRepo.save(newCode);
  }

  async updateCode(id: number, codeData: Partial<TwoFCodeAdm>): Promise<TwoFCodeAdm | null> {
    await this.codeAdmRepo.update(id, codeData);
    return this.findById(id);
  }

  async deleteCode(id: number): Promise<void> {
    await this.codeAdmRepo.delete(id);
  }
}
