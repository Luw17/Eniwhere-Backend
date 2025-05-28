import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class UsersService {

    constructor(private readonly databaseService: DatabaseService,) {
        console.log('DatabaseService:', this.databaseService);
    }
    async validateUser(usuario: string, senha: string) {
        return this.databaseService.validateUser(usuario, senha);
    }

    async getAllUsers(){
        return this.databaseService.selectUsers();
    }
    async getOneUser(id: number) {
        return this.databaseService.selectF(id);
    }
    async create(body) {
        if(body.nome && body.cpf && body.email) {
            body.criadoEm = new Date();
            if(body.telefone) body.telefone = '';
            const user = {
                nome: body.nome,
                cpf: body.cpf,
                email: body.email,
                telefone: body.telefone,
                criadoEm: body.criadoEm,
                usuario: body.cpf,
                senha: body.cpf,
                permissao: 'user'
            };
        try {
           await this.databaseService.insertUser(user);
        } catch (error) {
            console.error('Error inserting user:', error);
        }
        }
    }
    async updateUser(id: number,body) {
        return this.databaseService.update(id,body);
    }
    async deleteUser(id: number){
        return this.databaseService.delete(id);
    }
    async verifyUser(cpf: string){
        return this.databaseService.verifyUser(cpf);
    }
    async getIdByCpf(cpf: string){
        return this.databaseService.getIdByDocument(cpf);
    }
    
    /*todo: acertar a parte de authcode
    async updateAuthCode(userId: number, arg1: { authCode: string; authCodeExpiresAt: number; }) {
        return this.databaseService.updateAuthCode(userId, {codigoAtivo: arg1.authCode, authCodeExpiresAt: arg1.authCodeExpiresAt});
      }
       
    async findOne(  authCode: string  ) {
        return this.databaseService.selectCode( authCode);
      }
         */


    async getUserDeviceByid(deviceId: number, userId: number) {
        return this.databaseService.selectUserDeviceById(deviceId,userId);
    }
}