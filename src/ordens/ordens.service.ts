import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { EmailService } from "../email/email.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class OrdensService {
    constructor(private readonly DatabaseService: DatabaseService, private readonly usersService: UsersService, private readonly emailService: EmailService) {}
        async deleteOrdem(id: number) {
        return this.DatabaseService.deleteOrdem(id);
    }
    async updateOrdem(id: number, body: {}) {
        return this.DatabaseService.updateOrdem(id,body);
    }
    async getOneOrdem(id: number) {
        return this.DatabaseService.selectFOrdens(id);
    }
    async getAllOrdens() {
        return this.DatabaseService.selectOrdens();
    }
    async createOrdem(body: {cpf: string, aparelho: string, marca: string, modelo: string, problema: string}) {
        return this.DatabaseService.createOrdem(body);
    }
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
}


