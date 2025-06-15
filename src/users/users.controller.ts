import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller()
@UseGuards(RolesGuard)
export class UsersController {
      constructor(
    private readonly usersService: UsersService
  ) {}
  

  @Get('user')
  @Roles('admin', 'store', 'worker')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  
  @Get('user/:id')
  @Roles('admin', 'store', 'worker')
  async getOneUser(@Param('id') id: number) {
    return await this.usersService.getOneUser(id);
  }

  
  @Put('user/:id')
  @Roles('admin', 'store', 'worker', 'user')
  async updateUser(
    @Param('id') id: number,
    @Body() data: {username?: string; name?: string; email?: string; phone?: string; userPassword?: string; number?: number; address?: number;
      postal_code?: string; country?: string; state?: string; city?: string; neighborhood?: string; address_line?: string;
    },
  ) {

    const user = await this.usersService.getOneUser(id);
    if (!user) {
      throw new UnauthorizedException('usuario não encontrado');
    }
    return await this.usersService.updateUser(id, data);
  }

  
  @Post('user')
  @Roles('admin', 'store', 'worker')
  async createUser(
    @Body() data : { document: string; name: string; email: string; phone?: string ; username?: string; userPassword?: string ;number: number; address?: number;
      postal_code?: string; country?: string; state?: string; city?: string; neighborhood?: string; address_line?: string;
    }) {

    const userExists = await this.usersService.verifyUser(data.document);
    console.log('User verification result:', userExists);
    if (userExists) {
      throw new UnauthorizedException('CPF já cadastrado');
    }
    console.log('Creating user with data:', data);
    return await this.usersService.create(data);
  }


  @Delete('user/:id')
  @Roles('admin', 'store', 'worker', 'user')
  async deleteUser(@Param('id') id: number) {
    return await this.usersService.deleteUser(id);
  }
  

  @Get('user/verify/:cpf')
  @Roles('admin', 'store', 'worker')
  async verificarUsuario(@Param('cpf') cpf: string) {
    const sanitizedCpf = cpf.replace(/\D/g, '');
    console.log('entrou no get ' + sanitizedCpf);
    const userExists = await this.usersService.verifyUser(sanitizedCpf);
    return userExists;
  }
}
