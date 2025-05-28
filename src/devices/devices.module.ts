import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DeviceRepository } from '../database/repositories/device.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from 'src/database/entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  providers: [DevicesService, DeviceRepository],
  controllers: [DevicesController]
})
export class DevicesModule {}
