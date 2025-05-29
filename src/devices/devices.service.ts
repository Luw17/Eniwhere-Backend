import { Injectable } from '@nestjs/common';
import { Device } from 'src/database/entities/device.entity';
import { DeviceRepository } from 'src/database/repositories/device.repository';

@Injectable()
export class DevicesService {
    constructor(private readonly deviceRepository: DeviceRepository) {}

    async getDevices(): Promise<Device[]> {
        return await this.deviceRepository.findAll();
    }

    async getDeviceById(id: number): Promise<Device | null> {
        return await this.deviceRepository.findById(id);
    }

    async createDevice(device: Device): Promise<Device> {
        return await this.deviceRepository.createDevice(device);
    }

    async updateDevice(id: number, device: Device): Promise<boolean> {
        return await this.deviceRepository.updateDevice(id, device);
    }

    async deleteDevice(id: number): Promise<boolean> {
        return await this.deviceRepository.updateDevice(id,{active: false});
    }
}
