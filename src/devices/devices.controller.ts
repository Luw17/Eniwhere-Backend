import { Controller } from '@nestjs/common';
import { Get, Post, Body, Param } from "@nestjs/common";
import { DevicesService } from './devices.service';
import { Device } from 'src/database/entities/device.entity';


@Controller('eniwhere')
export class DevicesController {
    constructor(private readonly DevicesService: DevicesService) {}

    @Get('devices')
    getDevices(): Promise<Device[]> {
        return this.DevicesService.getDevices();
    }
}
