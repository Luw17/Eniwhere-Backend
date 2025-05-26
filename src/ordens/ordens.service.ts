import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { EmailService } from "../email/email.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class OrdensService {
    constructor(private readonly DatabaseService: DatabaseService, private readonly usersService: UsersService, private readonly emailService: EmailService) {}
        async deleteOrdem(id: number) {
        return this.DatabaseService.deleteOrder(id);
    }
    async updateOrdem(id: number, body: {}) {
        return this.DatabaseService.updateOrder(id,body);
    }
    async getOneOrdem(id: number) {
        return this.DatabaseService.selectOrder(id);
    }
    async getAllOrdens() {
        return this.DatabaseService.selectOrders();
    }
    /* todo: modificar essa função para receber os dados que vão chegar do front ( body vai ser modificado) e enviar para o database service da forma certa*/
    async createOrdem(data: {workerId:number,userId:number,deviceId:number,cpf:string}) {
        console.log('Creating order with data:', data);
        return this.DatabaseService.createOrder(data);
    }/**/
   /* todo: essa função sera toda modificada para o novo banco de dados
    async concluirOrdem(id: number, body: {conclusao: string}) {
        await this.updateOrdem(id, {concluida: true, conclusao: body.conclusao});
        const ordem = await this.getOneOrdem(id);
        const user = await this.usersService.getOneUser(ordem.usuarioId);
        await this.emailService.sendEmail({
          email: user.email,
          aparelho: ordem.aparelho,
          marca: ordem.marca,
          modelo: ordem.modelo,
          problema: ordem.problema,
        });
      }
        */
}


