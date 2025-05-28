import { Injectable } from '@nestjs/common';
import { Device } from 'src/database/entities/device.entity';
import { DeviceRepository } from 'src/database/repositories/device.repository';

@Injectable()
export class DevicesService {
    constructor(private readonly deviceRepository: DeviceRepository) {}

    async getDevices(): Promise<Device[]> {
        return await this.deviceRepository.findAll();
    }
}
