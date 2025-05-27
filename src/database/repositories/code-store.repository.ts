import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store2faCode } from '../entities/code-store.entity';

@Injectable()
export class CodeStoreRepository {
  constructor(
    @InjectRepository(Store2faCode)
    private readonly codeStoreRepo: Repository<Store2faCode>,
  ) {}

  async findAll(): Promise<Store2faCode[]> {
    return await this.codeStoreRepo.find({
      relations: ['store'], // Carrega também os dados da loja associada
    });
  }

  async findById(id: number): Promise<Store2faCode | null> {
    return await this.codeStoreRepo.findOne({
      where: { id },
      relations: ['store'],
    });
  }

  async findByCode(code: string): Promise<Store2faCode | null> {
    return await this.codeStoreRepo.findOne({
      where: { code },
      relations: ['store'],
    });
  }

  async createCode(data: Partial<Store2faCode>): Promise<Store2faCode> {
    const newCode = this.codeStoreRepo.create(data);
    return await this.codeStoreRepo.save(newCode);
  }

  async updateCode(id: number, data: Partial<Store2faCode>): Promise<Store2faCode> {
    await this.codeStoreRepo.update(id, data);
    return await this.findById(id);
  }

  async deleteCode(id: number): Promise<void> {
    await this.codeStoreRepo.delete(id);
  }
}
