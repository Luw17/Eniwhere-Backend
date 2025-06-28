import { 
  Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UseGuards, Req 
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { OrdensService } from './ordens.service';
import { UsersService } from 'src/users/users.service';

@Controller('order')
@UseGuards(RolesGuard)
export class OrdensController {
  constructor(
    private readonly ordensService: OrdensService, 
    private readonly usersService: UsersService
  ) {}

  @Get()
  @Roles('admin', 'store', 'worker')
  async getAllOrdens() {
    return await this.ordensService.getAllOrdens();
  }

  // Rotas fixas vêm antes das dinâmicas
  @Get('store')
  @Roles('store')
  async getOrdensByOwnStore(@Req() req: Request) {
    const user = req['user'];
    console.log('User from request:', user);
    return await this.ordensService.getOrdensByStore(user.id);
  }

  @Get('store/:storeId')
  @Roles('admin', 'worker')
  async getOrdensByStore(@Param('storeId') storeId: number) {
    return await this.ordensService.getOrdensByStore(storeId);
  }

  @Get(':id')
  @Roles('admin', 'store', 'worker')
  async getOneOrdem(@Param('id') id: number) {
    return await this.ordensService.getOneOrdem(id);
  }

  @Put(':id')
  @Roles('admin', 'store', 'worker')
  async updateOrdem(
    @Param('id') id: number,
    @Body() data: {
      workerId: number,
      deviceId: number,
      work: number,
      problem: string, 
      deadline: string,
      cost: number,
      status: string,
      storeId: number,
      userDeviceId: number
    }
  ) {
    return await this.ordensService.updateOrder(id, data);
  }

  @Post()
  @Roles('admin', 'store', 'worker')
  async createOrdem(
    @Body() data: {
      workerId: number,
      document: string,
      deviceId: number,
      userId: number,
      work: number,
      problem: string, 
      deadline: string,
      cost: number,
      status: string,
      storeId: number,
      userDeviceId: number
    }
  ) {
    console.log('Creating order with data:', data);
    const user = await this.usersService.verifyUser(data.document);
    console.log('User verification result:', user);
    if (!user) {
      throw new UnauthorizedException('CPF inválido');
    }
    data.userId = await this.usersService.getIdByDocument(data.document);
    console.log('User ID after verification:', data.userId);
    data.userDeviceId = await this.usersService.getUserDeviceByid(data.deviceId, data.userId);
    console.log('User Device ID:', data.userDeviceId);
    return await this.ordensService.createOrdem(data);
  }

@Post('storeNstatus')
@Roles('admin', 'store', 'worker')
async getOrdensByStoreAndStatus(
  @Req() req: Request,
  @Body() body: { status: string; storeId?: number }
) {
  const user = req['user'];
  const storeId = user.role === 'store' ? user.id : body.storeId;
  return await this.ordensService.getOrdensByStoreAndStatus(storeId, body.status);
}

  @Delete(':id')
  @Roles('admin', 'store', 'worker')
  async deleteOrdem(@Param('id') id: number) {
    return await this.ordensService.deleteOrdem(id);
  } 

  @Put(':id/conclude')
  @Roles('admin', 'store', 'worker')
  async concluirOrdem(@Param('id') id: number) {
    return await this.ordensService.concluirOrdem(id);
  }

  @Get(':id/history')
  @Roles('admin', 'store', 'worker')
  async getOrdemHistory(@Param('id') id: number) {
    return await this.ordensService.getOrdemHistory(id);
  }
}
