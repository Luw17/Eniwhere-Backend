import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store2FACode } from '../entities/code-store.entity';

@Injectable()
export class CodeStoreRepository {
  constructor(
    @InjectRepository(Store2FACode)
    private readonly codeStoreRepo: Repository<Store2FACode>,
  ) {}

  async findAll(): Promise<Store2FACode[]> {
    return await this.codeStoreRepo.find({
      relations: ['store'], // Carrega também os dados da loja associada
    });
  }

  async findById(id: number): Promise<Store2FACode | null> {
    return await this.codeStoreRepo.findOne({
      where: { id },
      relations: ['store'],
    });
  }

  async findByCode(code: string): Promise<Store2FACode | null> {
    return await this.codeStoreRepo.findOne({
      where: { code },
      relations: ['store'],
    });
  }

  async createCode(data: Partial<Store2FACode>): Promise<Store2FACode> {
    const newCode = this.codeStoreRepo.create(data);
    return await this.codeStoreRepo.save(newCode);
  }

  async updateCode(id: number, data: Partial<Store2FACode>): Promise<Store2FACode> {
    await this.codeStoreRepo.update(id, data);
    return await this.findById(id);
  }

  async deleteCode(id: number): Promise<void> {
    await this.codeStoreRepo.delete(id);
  }
}
