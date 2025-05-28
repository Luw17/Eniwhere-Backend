import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUser } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(AppUser)
    private readonly userRepo: Repository<AppUser>,
  ) {}

  // Busca todos os usuários, incluindo suas relações com address, devices e codes
  async findAll(): Promise<AppUser[]> {
    return await this.userRepo.find({
      where: { active: true },
      relations: ['address', 'userDevices'], // Relaciona as entidades associadas
    });
  }

  // Busca um usuário pelo ID
  async findById(id: number): Promise<AppUser | null> {
    return await this.userRepo.findOne({
      where: { id , active: true },
      relations: [],
    });
  }

  // Cria um novo usuário
async createUser(data: Partial<AppUser>): Promise<boolean> {
  try {
    const newUser = this.userRepo.create(data);
    await this.userRepo.save(newUser);
    return true;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return false;
  }
}

  // Atualiza um usuário existente
  async updateUser(id: number, data: Partial<AppUser>): Promise<AppUser> {
    await this.userRepo.update(id, data);
    return await this.findById(id);
  }

  // Deleta um usuário pelo ID
  async deleteUser(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  // Busca todos os usuários de um endereço específico
  async findByAddressId(addressId: number): Promise<AppUser[]> {
    return await this.userRepo.find({
      where: { address: { id: addressId }, active: true },
      relations: ['address', 'devices', 'codes'], // Relaciona as entidades associadas
    });
  }

  // Busca um usuário pelo código de um usuário
  async findByCode(code: string): Promise<AppUser | null> {
    return await this.userRepo.findOne({
      where: { code },
      relations: ['address', 'devices', 'codes'], // Relaciona as entidades associadas
    });
  }
}
