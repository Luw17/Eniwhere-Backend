import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeStore } from '../entities/code-store.entity';

@Injectable()
export class CodeStoreRepository {
  constructor(
    @InjectRepository(CodeStore)
    private readonly codeStoreRepo: Repository<CodeStore>,
  ) {}

  async findAll(): Promise<CodeStore[]> {
    return await this.codeStoreRepo.find({
      relations: ['store'], // Carrega também os dados da loja associada
    });
  }

  async findById(id: number): Promise<CodeStore | null> {
    return await this.codeStoreRepo.findOne({
      where: { id },
      relations: ['store'],
    });
  }

  async findByCode(code: string): Promise<CodeStore | null> {
    return await this.codeStoreRepo.findOne({
      where: { code },
      relations: ['store'],
    });
  }

  async createCode(data: Partial<CodeStore>): Promise<CodeStore> {
    const newCode = this.codeStoreRepo.create(data);
    return await this.codeStoreRepo.save(newCode);
  }

  async updateCode(id: number, data: Partial<CodeStore>): Promise<CodeStore> {
    await this.codeStoreRepo.update(id, data);
    return await this.findById(id);
  }

  async deleteCode(id: number): Promise<void> {
    await this.codeStoreRepo.delete(id);
  }
}
