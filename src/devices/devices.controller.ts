import { Controller, Delete, Put } from '@nestjs/common';
import { Get, Post, Body, Param } from "@nestjs/common";
import { DevicesService } from './devices.service';
import { Device } from 'src/database/entities/device.entity';


@Controller('eniwhere')
export class DevicesController {
    constructor(private readonly DevicesService: DevicesService) {}

    //ok
    @Get('devices')
    getDevices(): Promise<Device[]> {
        return this.DevicesService.getDevices();
    }

    //ok
    @Get('devices/:id')
    getDeviceById(@Param('id') id: number): Promise<Device | null> {
        return this.DevicesService.getDeviceById(id);
    }

    //ok
    @Post('devices')
    createDevice(@Body() device: Device): Promise<Device> {
        return this.DevicesService.createDevice(device);
    }

    //ok
    @Put('devices/:id')
    updateDevice(@Param('id') id: number, @Body() device: Device): Promise<boolean> {
        return this.DevicesService.updateDevice(id, device);
    }

    //ok
    @Delete('devices/:id')
    deleteDevice(@Param('id') id: number): Promise<boolean> {
        return this.DevicesService.deleteDevice(id);
    }
  
}
