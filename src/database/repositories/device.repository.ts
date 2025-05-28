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
  findAll(): Promise<Device[]> {
    return this.deviceRepo.find({
      relations: [],
    });
  }

  // Busca um dispositivo pelo ID
  findById(id: number): Promise<Device | null> {
    return this.deviceRepo.findOne({
      where: { id },
      relations: ['userDevices'], // Relaciona o dispositivo com os usuários
    });
  }

  // Busca um dispositivo pelo nome
  findByDeviceName(deviceName: string): Promise<Device | null> {
    return this.deviceRepo.findOne({
      where: {  deviceName},
      relations: ['userDevices'], // Relaciona o dispositivo com os usuários
    });
  }

  // Criação de um novo dispositivo
  async createDevice(data: Partial<Device>): Promise<Device> {
    const newDevice = this.deviceRepo.create(data);
    return this.deviceRepo.save(newDevice);
  }

  // Atualização de um dispositivo existente
  async updateDevice(id: number, data: Partial<Device>): Promise<Device | null> {
    await this.deviceRepo.update(id, data);
    return this.findById(id);
  }

  // Deleta um dispositivo pelo ID
  async deleteDevice(id: number): Promise<void> {
    await this.deviceRepo.delete(id);
  }
}
