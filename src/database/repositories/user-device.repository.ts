import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDevice } from '../entities/user-device.entity';

@Injectable()
export class UserDeviceRepository {
  constructor(
    @InjectRepository(UserDevice)
    private readonly userDeviceRepo: Repository<UserDevice>,
  ) {}

  // Busca todos os dispositivos de usuários, incluindo suas relações com User, Device e Orders
  async findAll(): Promise<UserDevice[]> {
    return await this.userDeviceRepo.find({
      relations: ['user', 'device', 'orders'], // Relaciona as entidades associadas
    });
  }

  // Busca um dispositivo de usuário pelo ID
  async findById(id: number): Promise<UserDevice | null> {
    return await this.userDeviceRepo.findOne({
      where: { id },
      relations: ['user', 'device', 'orders'], // Relaciona as entidades associadas
    });
  }

  // Cria um novo dispositivo de usuário
  async createUserDevice(data: Partial<UserDevice>): Promise<UserDevice> {
    const newUserDevice = this.userDeviceRepo.create(data);
    return await this.userDeviceRepo.save(newUserDevice);
  }

  // Atualiza um dispositivo de usuário existente
  async updateUserDevice(id: number, data: Partial<UserDevice>): Promise<UserDevice> {
    await this.userDeviceRepo.update(id, data);
    return await this.findById(id);
  }

  // Deleta um dispositivo de usuário pelo ID
  async deleteUserDevice(id: number): Promise<void> {
    await this.userDeviceRepo.delete(id);
  }

  // Busca todos os dispositivos de um usuário específico
  async findByUserId(userId: number): Promise<UserDevice[]> {
    return await this.userDeviceRepo.find({
      where: { user: { id: userId } },
      relations: ['device', 'orders'], // Relaciona as entidades associadas
    });
  }

  // Busca todos os dispositivos por modelo
  async findByDeviceModel(model: string): Promise<UserDevice[]> {
    return await this.userDeviceRepo.find({
      where: { device: { model } },
      relations: ['user', 'orders'], // Relaciona as entidades associadas
    });
  }
}
