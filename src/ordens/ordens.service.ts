import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { EmailService } from "../email/email.service";
import { UsersService } from "../users/users.service";
import { ServiceOrder } from "src/database/entities/service_order.entity";
import { UserDevice } from "src/database/entities/user_has_device.entity";
import { StoreWorker } from "src/database/entities/worker.entity";
import { Store } from "src/database/entities/store.entity";

@Injectable()
export class OrdensService {
    constructor(private readonly DatabaseService: DatabaseService, private readonly usersService: UsersService, private readonly emailService: EmailService) {}
        async deleteOrdem(id: number) {
        return this.DatabaseService.deleteOrder(id);
    }
    async updateOrdem(id: number, data: {workerId:number,document:string,deviceId:number,userId:number, work: string, problem: string, deadline: string, cost: number, status: string, storeId: number,userDeviceId: number} ) {
        console.log('Updating order with data:', data);
        return this.DatabaseService.updateOrder(id,data);
    }
    //done
    async getOneOrdem(id: number) {
        return this.DatabaseService.selectOrder(id);
    }
    //done
    async getAllOrdens() {
        return this.DatabaseService.selectOrders();
    }
    async getOrdensByStore(storeId: number) {
        return this.DatabaseService.selectOrdersByStore(storeId);
    }
    /* todo: modificar essa função para receber os dados que vão chegar do front ( body vai ser modificado) e enviar para o database service da forma certa*/
    async createOrdem(data: {
    workerId: number;
    document: string;
    deviceId: number;
    userId: number;
    work: number;  // Alterado para number (era string)
    problem: string;
    deadline: string;
    cost: number;  // Já está correto como number
    status: string;
    storeId: number;
    userDeviceId: number;
    }) {
    console.log('Creating order with data:', data);
    
    const orderData: Partial<ServiceOrder> = {
        work: data.work,  // Agora aceita number diretamente
        problem: data.problem,
        deadline: data.deadline ? new Date(data.deadline) : null,
        cost: data.cost,  // Mantém como number (não precisa converter para string)
        status: data.status,
        userDevice: { id: data.userDeviceId } as UserDevice,
        worker: { id: data.workerId } as StoreWorker,
        store: { id: data.storeId } as Store,
    };

    return this.DatabaseService.createOrder(orderData);
    }
    async concluirOrdem(id: number) {
        return this.DatabaseService.updateOrder(id,{status: 'completed'});
    }

    async getOrdensByStoreAndStatus(storeId: number, status: string) {
        return this.DatabaseService.selectOrdersByStoreAndStatus(storeId, status);
    }
}


