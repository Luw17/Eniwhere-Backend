import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { OrdensService } from './ordens.service';
import { UsersService } from 'src/users/users.service';

@Controller()
@UseGuards(RolesGuard)
export class OrdensController {
    constructor(private readonly ordensService: OrdensService, private readonly usersService: UsersService) {}
    @Get('order')
    @Roles('admin', 'store', 'worker')
    async getAllOrdens() {
        return await this.ordensService.getAllOrdens();
    }


    @Get('order/:id')
    @Roles('admin', 'store', 'worker')
    async getOneOrdem(@Param('id') id: number) {
        return await this.ordensService.getOneOrdem(id);
    }


    @Get('order/store/:storeId')
    @Roles('admin', 'store', 'worker')
    async getOrdensByStore(@Param('storeId') storeId: number) {
        return await this.ordensService.getOrdensByStore(storeId);
    }


    @Put('order/:id')
    @Roles('admin', 'store', 'worker')
    async updateOrdem(
    @Param('id') id: number,
    @Body() data: {workerId:number,document:string,deviceId:number,userId:number, work: string, problem: string, 
          deadline: string, cost: number, status: string, storeId: number,userDeviceId: number} 
    ) {
        return await this.ordensService.updateOrdem(id, data);
    }


    @Post('order')
    @Roles('admin', 'store', 'worker')
    async createOrdem( @Body() data: {workerId:number,document:string,deviceId:number,userId:number, work: number, problem: string, 
        deadline: string, cost: number, status: string, storeId: number,userDeviceId: number}
    ) {
        console.log('Creating order with data:', data);
        const user = await this.usersService.verifyUser(data.document);
        console.log('User verification result:', user);
        if (!user) {
          throw new UnauthorizedException('CPF inválido');
        }
        data.userId = await this.usersService.getIdByCpf(data.document);
        console.log('User ID after verification:', data.userId);
        data.userDeviceId = await this.usersService.getUserDeviceByid(data.deviceId, data.userId);
        console.log('User Device ID:', data.userDeviceId);
        return await this.ordensService.createOrdem(data);
      }


    @Post('order/storeNstatus')
    @Roles('admin', 'store', 'worker')
    async getOrdensByStoreAndStatus(
    @Body() body: { storeId: number; status: string }
    ) {
        return await this.ordensService.getOrdensByStoreAndStatus(
          body.storeId,
          body.status
        );
      } 
      
    
    @Delete('order/:id')
    @Roles('admin', 'store', 'worker')
    async deleteOrdem(@Param('id') id: number) {
        return await this.ordensService.deleteOrdem(id);
    } 
    
    
    @Put('order/:id/conclude')
    @Roles('admin', 'store', 'worker')
    async concluirOrdem(
    @Param('id') id: number) {
        return await this.ordensService.concluirOrdem(id);
    }
}
