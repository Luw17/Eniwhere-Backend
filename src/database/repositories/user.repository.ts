import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Busca todos os usuários, incluindo suas relações com address, devices e codes
  async findAll(): Promise<User[]> {
    return await this.userRepo.find({
      relations: ['address', 'devices', 'codes'], // Relaciona as entidades associadas
    });
  }

  // Busca um usuário pelo ID
  async findById(id: number): Promise<User | null> {
    return await this.userRepo.findOne({
      where: { id },
      relations: ['address', 'devices', 'codes'], // Relaciona as entidades associadas
    });
  }

  // Cria um novo usuário
  async createUser(data: Partial<User>): Promise<User> {
    const newUser = this.userRepo.create(data);
    return await this.userRepo.save(newUser);
  }

  // Atualiza um usuário existente
  async updateUser(id: number, data: Partial<User>): Promise<User> {
    await this.userRepo.update(id, data);
    return await this.findById(id);
  }

  // Deleta um usuário pelo ID
  async deleteUser(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  // Busca todos os usuários de um endereço específico
  async findByAddressId(addressId: number): Promise<User[]> {
    return await this.userRepo.find({
      where: { address: { id: addressId } },
      relations: ['address', 'devices', 'codes'], // Relaciona as entidades associadas
    });
  }

  // Busca um usuário pelo código de um usuário
  async findByCode(code: string): Promise<User | null> {
    return await this.userRepo.findOne({
      where: { code },
      relations: ['address', 'devices', 'codes'], // Relaciona as entidades associadas
    });
  }
}
