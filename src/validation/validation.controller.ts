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

  @Get('ordens')
  async getAllOrdens() {
    return await this.ordensService.getAllOrdens();
  }

  @Get('ordens/:id')
  async getOneOrdem(@Param('id') id: number) {
    return await this.ordensService.getOneOrdem(id);
  }

  @Put('ordens/:id')
  async updateOrdem(
    @Param('id') id: number,
    @Body(ValidateCpfPipe) body: { cpf: string; [key: string]: any }, // Valida o objeto completo com o Pipe
  ) {
    const { cpf } = body;
    const user = await this.usersService.verifyUser(cpf); // Confirma que o CPF existe
    if (!user) {
      throw new UnauthorizedException('CPF inválido');
    }
    return await this.ordensService.updateOrdem(id, body);
  }
    /*sujeita a troca de nome e valores de entrada*/
  @Post('ordens')
  async createOrdem( data: {workerId:number,cpf:string,deviceId:number,userId:number}
  ) {
    const user = await this.usersService.verifyUser(data.cpf);
    if (!user) {
      throw new UnauthorizedException('CPF inválido');
    }
    data.userId = await this.usersService.getIdByCpf(data.cpf);
    return await this.ordensService.createOrdem(data);
  }
  @Post('ordens/filter')
  async getOrdensByStoreAndStatus(
    @Body() body: { storeId: number; status: string }
  ) {
    return await this.ordensService.getOrdensByStoreAndStatus(
      body.storeId,
      body.status
    );
  }
  @Delete('ordens/:id')
  async deleteOrdem(@Param('id') id: number) {
    return await this.ordensService.deleteOrdem(id);
  }
  /*função em manutenção
    sujeita a troca de nome e valores de entrada
  @Put('ordens/:id/concluir')
  async concluirOrdem(
    @Param('id') id: number,
    @Body() body: { conclusao: string }
  ) {
    return await this.ordensService.concluirOrdem(id, body);
  }
    */

  @Get('usuarios')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Get('usuarios/:id')
  async getOneUser(@Param('id') id: number) {
    return await this.usersService.getOneUser(id);
  }

  @Put('usuarios/:id')
  async updateUser(
    @Param('id') id: number,
    @Body(ValidateCpfPipe) body: { cpf: string; [key: string]: any }, // Valida o objeto completo com o Pipe
  ) {
    const { cpf } = body;
    const user = await this.usersService.verifyUser(cpf); // Confirma que o CPF existe
    if (!user) {
      throw new UnauthorizedException('CPF inválido');
    }
    return await this.usersService.updateUser(id, body);
  }

  @Post('usuarios')
  async createUser(
    @Body(ValidateCpfPipe) body: { cpf: string; nome: string; email: string; telefone: string } // Valida o objeto completo com o Pipe
  ) {
    const { cpf } = body;
    console.log('entrou no post ' + cpf);
    const userExists = await this.usersService.verifyUser(cpf);
    if (userExists) {
      throw new UnauthorizedException('CPF já cadastrado');
    }
    return await this.usersService.create(body);
  }

  @Delete('usuarios/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.usersService.deleteUser(id);
  }
  
  @Get('usuarios/verificar/:cpf')
  async verificarUsuario(@Param('cpf') cpf: string) {
    const sanitizedCpf = cpf.replace(/\D/g, '');
    console.log('entrou no get ' + sanitizedCpf);
    const userExists = await this.usersService.verifyUser(sanitizedCpf);
    return userExists;
  }
}
