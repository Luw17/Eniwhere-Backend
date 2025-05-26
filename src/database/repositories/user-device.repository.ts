import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserHasDevice } from '../entities/user_has_device.entity';

@Injectable()
export class UserDeviceRepository {
  constructor(
    @InjectRepository(UserHasDevice)
    private readonly userDeviceRepo: Repository<UserHasDevice>,
  ) {}

  // Busca todos os dispositivos de usuários, incluindo suas relações com User, Device e Orders
  async findAll(): Promise<UserHasDevice[]> {
    return await this.userDeviceRepo.find({
      relations: ['user', 'device', 'orders'], // Relaciona as entidades associadas
    });
  }

  // Busca um dispositivo de usuário pelo ID
  async findById(id: number): Promise<UserHasDevice | null> {
    return await this.userDeviceRepo.findOne({
      where: { id },
      relations: ['user', 'device', 'orders'], // Relaciona as entidades associadas
    });
  }

  // Cria um novo dispositivo de usuário
async createUserDevice(data: Partial<UserHasDevice>): Promise<number> {
  const newUserDevice = this.userDeviceRepo.create(data);
  const savedUserDevice = await this.userDeviceRepo.save(newUserDevice);
  return savedUserDevice.id;
}

  // Atualiza um dispositivo de usuário existente
  async updateUserDevice(id: number, data: Partial<UserHasDevice>): Promise<UserHasDevice> {
    await this.userDeviceRepo.update(id, data);
    return await this.findById(id);
  }

  // Deleta um dispositivo de usuário pelo ID
  async deleteUserDevice(id: number): Promise<void> {
    await this.userDeviceRepo.delete(id);
  }

  // Busca todos os dispositivos de um usuário específico
  async findByUserId(userId: number): Promise<UserHasDevice[]> {
    return await this.userDeviceRepo.find({
      where: { user: { id: userId } },
      relations: ['device', 'orders'], // Relaciona as entidades associadas
    });
  }

  // Busca todos os dispositivos por modelo
  async findByDeviceModel(model: string): Promise<UserHasDevice[]> {
    return await this.userDeviceRepo.find({
      where: { device: { model } },
      relations: ['user', 'orders'], // Relaciona as entidades associadas
    });
  }
}
