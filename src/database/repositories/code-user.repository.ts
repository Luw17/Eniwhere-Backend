import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User2FACode } from '../entities/code-user.entity';

@Injectable()
export class CodeUserRepository {
  constructor(
    @InjectRepository(User2FACode)
    private readonly codeUserRepo: Repository<User2FACode>,
  ) {}

  // Busca todos os códigos com o usuário associado
  async findAll(): Promise<User2FACode[]> {
    return await this.codeUserRepo.find({
      relations: ['user'], // Agora a relação está com 'user'
    });
  }

  // Busca um código pelo ID
  async findById(id: number): Promise<User2FACode | null> {
    return await this.codeUserRepo.findOne({
      where: { id },
      relations: ['user'], // Relaciona o código ao usuário
    });
  }

  // Busca um código pelo código em si
  async findByCode(code: string): Promise<User2FACode | null> {
    return await this.codeUserRepo.findOne({
      where: { code },
      relations: ['user'], // Relaciona o código ao usuário
    });
  }

  // Criação de um novo código de usuário
  async createCode(data: Partial<User2FACode>): Promise<User2FACode> {
    const newCode = this.codeUserRepo.create(data);
    return await this.codeUserRepo.save(newCode);
  }

  // Atualização de um código existente
  async updateCode(id: number, data: Partial<User2FACode>): Promise<User2FACode> {
    await this.codeUserRepo.update(id, data);
    return await this.findById(id);
  }

  // Deleta um código pelo ID
  async deleteCode(id: number): Promise<void> {
    await this.codeUserRepo.delete(id);
  }
}
