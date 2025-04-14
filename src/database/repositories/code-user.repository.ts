import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeUser } from '../entities/code-user.entity';

@Injectable()
export class CodeUserRepository {
  constructor(
    @InjectRepository(CodeUser)
    private readonly codeUserRepo: Repository<CodeUser>,
  ) {}

  // Busca todos os códigos com o usuário associado
  async findAll(): Promise<CodeUser[]> {
    return await this.codeUserRepo.find({
      relations: ['user'], // Agora a relação está com 'user'
    });
  }

  // Busca um código pelo ID
  async findById(id: number): Promise<CodeUser | null> {
    return await this.codeUserRepo.findOne({
      where: { id },
      relations: ['user'], // Relaciona o código ao usuário
    });
  }

  // Busca um código pelo código em si
  async findByCode(code: string): Promise<CodeUser | null> {
    return await this.codeUserRepo.findOne({
      where: { code },
      relations: ['user'], // Relaciona o código ao usuário
    });
  }

  // Criação de um novo código de usuário
  async createCode(data: Partial<CodeUser>): Promise<CodeUser> {
    const newCode = this.codeUserRepo.create(data);
    return await this.codeUserRepo.save(newCode);
  }

  // Atualização de um código existente
  async updateCode(id: number, data: Partial<CodeUser>): Promise<CodeUser> {
    await this.codeUserRepo.update(id, data);
    return await this.findById(id);
  }

  // Deleta um código pelo ID
  async deleteCode(id: number): Promise<void> {
    await this.codeUserRepo.delete(id);
  }
}
