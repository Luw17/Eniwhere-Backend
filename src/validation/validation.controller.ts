import { Controller, Delete, Put, UnauthorizedException } from "@nestjs/common";
import { Get, Post, Body, Param } from "@nestjs/common";
import { OrdensService } from "../ordens/ordens.service";
import { UsersService } from "../users/users.service";
import { ValidateCpfPipe } from "./pipes/validation-cpf.pipe";

@Controller('eniwhere')
export class ValidationController {
  constructor(
    private readonly ordensService: OrdensService,
    private readonly usersService: UsersService
  ) {}

  //done
  @Get('ordens')
  async getAllOrdens() {
    return await this.ordensService.getAllOrdens();
  }
  //done
  @Get('ordens/:id')
  async getOneOrdem(@Param('id') id: number) {
    return await this.ordensService.getOneOrdem(id);
  }
  //done
  @Get('ordens/loja/:storeId')
  async getOrdensByStore(@Param('storeId') storeId: number) {
    return await this.ordensService.getOrdensByStore(storeId);
  }

  //done
  @Put('ordens/:id')
  async updateOrdem(
    @Param('id') id: number,
    @Body() data: {workerId:number,document:string,deviceId:number,userId:number, work: string, problem: string, 
      deadline: string, cost: number, status: string, storeId: number,userDeviceId: number} 
  ) {
    return await this.ordensService.updateOrdem(id, data);
  }
  
  //done
  @Post('ordens')
  async createOrdem( @Body() data: {workerId:number,document:string,deviceId:number,userId:number, work: string, problem: string, 
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

  //done
  @Post('ordens/storeNstatus')
  async getOrdensByStoreAndStatus(
    @Body() body: { storeId: number; status: string }
  ) {
    return await this.ordensService.getOrdensByStoreAndStatus(
      body.storeId,
      body.status
    );
  }

  //done
  @Delete('ordens/:id')
  async deleteOrdem(@Param('id') id: number) {
    return await this.ordensService.deleteOrdem(id);
  }

  //done
  @Put('ordens/:id/concluir')
  async concluirOrdem(
    @Param('id') id: number) {
    return await this.ordensService.concluirOrdem(id);
  }

  //done
  @Get('usuarios')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  //done
  @Get('usuarios/:id')
  async getOneUser(@Param('id') id: number) {
    return await this.usersService.getOneUser(id);
  }

  //done
  @Put('usuarios/:id')
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

  //done
  @Post('usuarios')
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

  //done
  @Delete('usuarios/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.usersService.deleteUser(id);
  }
  
  //done
  @Get('usuarios/verificar/:cpf')
  async verificarUsuario(@Param('cpf') cpf: string) {
    const sanitizedCpf = cpf.replace(/\D/g, '');
    console.log('entrou no get ' + sanitizedCpf);
    const userExists = await this.usersService.verifyUser(sanitizedCpf);
    return userExists;
  }
}
