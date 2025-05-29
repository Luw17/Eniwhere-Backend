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
      where: { active: true },
      relations: [],
    });
  }

  // Busca um dispositivo pelo ID
  findById(id: number): Promise<Device | null> {
    return this.deviceRepo.findOne({
      where: { id },
      relations: [],
    });
  }

  // Busca um dispositivo pelo nome
  findByDeviceName(deviceName: string): Promise<Device | null> {
    return this.deviceRepo.findOne({
      where: {  deviceName},
      relations: [], // Relaciona o dispositivo com os usuários
    });
  }

  // Criação de um novo dispositivo
  async createDevice(data: Partial<Device>): Promise<Device> {
    const newDevice = this.deviceRepo.create(data);
    return this.deviceRepo.save(newDevice);
  }

  // Atualização de um dispositivo existente
  async updateDevice(id: number, data: Partial<Device>): Promise<boolean> {
    try {
      await this.deviceRepo.update(id, data);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar dispositivo:', error);
      return false;
    }
  }

  // Deleta um dispositivo pelo ID
  async deleteDevice(id: number): Promise<void> {
    await this.deviceRepo.delete(id);
  }
}
