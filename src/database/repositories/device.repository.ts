import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../entities/device.entity';

@Injectable()
export class DeviceRepository {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

  // Busca todos os dispositivos com a relação de UserDevice
  async findAll(): Promise<Device[]> {
    return await this.deviceRepo.find({
      relations: ['userDevices'], // Inclui os dispositivos de usuários
    });
  }

  // Busca um dispositivo pelo ID
  async findById(id: number): Promise<Device | null> {
    return await this.deviceRepo.findOne({
      where: { id },
      relations: ['userDevices'], // Relaciona o dispositivo com os usuários
    });
  }

  // Busca um dispositivo pelo nome
  async findByDeviceName(device: string): Promise<Device | null> {
    return await this.deviceRepo.findOne({
      where: { device },
      relations: ['userDevices'], // Relaciona o dispositivo com os usuários
    });
  }

  // Criação de um novo dispositivo
  async createDevice(data: Partial<Device>): Promise<Device> {
    const newDevice = this.deviceRepo.create(data);
    return await this.deviceRepo.save(newDevice);
  }

  // Atualização de um dispositivo existente
  async updateDevice(id: number, data: Partial<Device>): Promise<Device> {
    await this.deviceRepo.update(id, data);
    return await this.findById(id);
  }

  // Deleta um dispositivo pelo ID
  async deleteDevice(id: number): Promise<void> {
    await this.deviceRepo.delete(id);
  }
}
