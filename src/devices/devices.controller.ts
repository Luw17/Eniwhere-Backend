import { Controller, Delete, Put, UseGuards } from '@nestjs/common';
import { Get, Post, Body, Param } from "@nestjs/common";
import { DevicesService } from './devices.service';
import { Device } from 'src/database/entities/device.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';


@Controller()
@UseGuards(RolesGuard)
export class DevicesController {
    constructor(private readonly DevicesService: DevicesService) {}

    //ok
    @Get('devices')
    @Roles('admin', 'store', 'worker')
    getDevices(): Promise<Device[]> {
        return this.DevicesService.getDevices();
    }

    //ok
    @Get('devices/:id')
    @Roles('admin', 'store', 'worker')
    getDeviceById(@Param('id') id: number): Promise<Device | null> {
        return this.DevicesService.getDeviceById(id);
    }

    //ok
    @Post('devices')
    @Roles('admin', 'store', 'worker')
    createDevice(@Body() device: Device): Promise<Device> {
        return this.DevicesService.createDevice(device);
    }

    //ok
    @Put('devices/:id')
    @Roles('admin', 'store', 'worker')
    updateDevice(@Param('id') id: number, @Body() device: Device): Promise<boolean> {
        return this.DevicesService.updateDevice(id, device);
    }

    //ok
    @Delete('devices/:id')
    @Roles('admin', 'store', 'worker')
    deleteDevice(@Param('id') id: number): Promise<boolean> {
        return this.DevicesService.deleteDevice(id);
    }
  
}
