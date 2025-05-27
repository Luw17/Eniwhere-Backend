import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User2faCode } from '../entities/code-user.entity';

@Injectable()
export class CodeUserRepository {
  constructor(
    @InjectRepository(User2faCode)
    private readonly codeUserRepo: Repository<User2faCode>,
  ) {}

  // Busca todos os códigos com o usuário associado
  async findAll(): Promise<User2faCode[]> {
    return await this.codeUserRepo.find({
      relations: ['user'], // Agora a relação está com 'user'
    });
  }

  // Busca um código pelo ID
  async findById(id: number): Promise<User2faCode | null> {
    return await this.codeUserRepo.findOne({
      where: { id },
      relations: ['user'], // Relaciona o código ao usuário
    });
  }

  // Busca um código pelo código em si
  async findByCode(code: string): Promise<User2faCode | null> {
    return await this.codeUserRepo.findOne({
      where: { code },
      relations: ['user'], // Relaciona o código ao usuário
    });
  }

  // Criação de um novo código de usuário
  async createCode(data: Partial<User2faCode>): Promise<User2faCode> {
    const newCode = this.codeUserRepo.create(data);
    return await this.codeUserRepo.save(newCode);
  }

  // Atualização de um código existente
  async updateCode(id: number, data: Partial<User2faCode>): Promise<User2faCode> {
    await this.codeUserRepo.update(id, data);
    return await this.findById(id);
  }

  // Deleta um código pelo ID
  async deleteCode(id: number): Promise<void> {
    await this.codeUserRepo.delete(id);
  }
}
