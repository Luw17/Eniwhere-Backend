import { Injectable } from "@nestjs/common";
import { EmailService } from "../email/email.service";
import { ServiceOrder } from "src/database/entities/service_order.entity";
import { UserDevice } from "src/database/entities/user_has_device.entity";
import { StoreWorker } from "src/database/entities/worker.entity";
import { Store } from "src/database/entities/store.entity";
import { OrderRepository } from "src/database/repositories/order.repository";
import { OrderLog } from "src/database/entities/order_log.entity";
import { OrderLogRepository } from "src/database/repositories/order-log.repository";
import { PictureRepository } from "src/database/repositories/pictures.repository";

@Injectable()
export class OrdensService {
    constructor( private readonly emailService: EmailService,
         private readonly orderRepository: OrderRepository, private readonly orderLogRepository: OrderLogRepository,private readonly pictureRepository: PictureRepository) {}
    async deleteOrdem(id: number) {
        try {
            const order = await this.orderRepository.findById(id);
            if (!order) return;
            await this.orderRepository.updateOrder(id, {
                completed_at: new Date(),
                status: 'cancelled',
            });
        } catch (error) {
            console.error('Erro ao deletar ordem:', error);
        }
    }
async updateOrder(
  id: number,
  data: Partial<{
    workerId: number;
    deviceId: number;
    work: number;
    problem: string;
    deadline: string;
    cost: number;
    status: string;
    storeId: number;
    userDeviceId: number;
  }>
) {
  const parseNullableNumber = (value: any): number | null => {
    const num = Number(value);
    return isNaN(num) ? null : num;
  };

  try {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      console.error("Ordem não encontrada");
      return;
    }

    const orderDeadlineDate = order.deadline ? new Date(order.deadline) : null;
    const newDeadlineDate = data.deadline ? new Date(data.deadline) : null;

    const updateData: Partial<ServiceOrder> = {
      ...(data.workerId !== undefined && { worker: { id: data.workerId } as StoreWorker }),
      ...(data.storeId !== undefined && { store: { id: data.storeId } as Store }),
      ...(data.userDeviceId !== undefined && { userDevice: { id: data.userDeviceId } as UserDevice }),
      ...(data.work !== undefined && { work: data.work }),
      ...(data.problem !== undefined && { problem: data.problem }),
      ...(data.deadline !== undefined && { deadline: newDeadlineDate }),
      ...(data.cost !== undefined && { cost: data.cost }),
      ...(data.status !== undefined && { status: data.status }),
    };

    if (data.status === "completed" && order.status !== "completed") {
      updateData.completed_at = new Date();
    }

    const changedFields = [];

    if (data.workerId !== undefined && order.worker?.id !== data.workerId)
      changedFields.push({ field: "workerId", oldValue: order.worker?.id, newValue: data.workerId });

    if (data.storeId !== undefined && order.store?.id !== data.storeId)
      changedFields.push({ field: "storeId", oldValue: order.store?.id, newValue: data.storeId });

    if (data.userDeviceId !== undefined && order.userDevice?.id !== data.userDeviceId)
      changedFields.push({ field: "userDeviceId", oldValue: order.userDevice?.id, newValue: data.userDeviceId });

    if (data.work !== undefined && order.work !== data.work)
      changedFields.push({ field: "work", oldValue: order.work, newValue: data.work });

    if (data.problem !== undefined && order.problem !== data.problem)
      changedFields.push({ field: "problem", oldValue: order.problem, newValue: data.problem });

    if (
      data.deadline !== undefined &&
      (
        (!orderDeadlineDate && newDeadlineDate) ||
        (orderDeadlineDate && !newDeadlineDate) ||
        (orderDeadlineDate && newDeadlineDate && orderDeadlineDate.toISOString() !== newDeadlineDate.toISOString())
      )
    )
      changedFields.push({
        field: "deadline",
        oldValue: orderDeadlineDate ? orderDeadlineDate.toISOString() : null,
        newValue: newDeadlineDate ? newDeadlineDate.toISOString() : null,
      });

    if (data.cost !== undefined && order.cost !== data.cost)
      changedFields.push({ field: "cost", oldValue: order.cost, newValue: data.cost });

    if (data.status !== undefined && order.status !== data.status)
      changedFields.push({ field: "status", oldValue: order.status, newValue: data.status });

    await this.orderRepository.updateOrder(id, updateData);
    console.log("Ordem atualizada com sucesso");

    if (changedFields.length > 0) {
      const orderLog = new OrderLog();
      orderLog.serviceOrder = order;

      const costChange = changedFields.find((c) => c.field === "cost");
      const workChange = changedFields.find((c) => c.field === "work");
      const deadlineChange = changedFields.find((c) => c.field === "deadline");

      orderLog.cost = costChange ? parseNullableNumber(costChange.oldValue) : null;
      orderLog.work = workChange ? parseNullableNumber(workChange.oldValue) : null;
      orderLog.status = changedFields.find((c) => c.field === "status")?.oldValue ?? "";
      orderLog.deadline = deadlineChange && deadlineChange.oldValue ? new Date(deadlineChange.oldValue) : null;
      orderLog.problem = changedFields.find((c) => c.field === "problem")?.oldValue ?? "";
      orderLog.logDate = new Date();

      await this.orderLogRepository.save(orderLog);
    }

    const user = await this.orderRepository.findUserEmailNameById(id);
    if (!user?.email) {
      console.error("Email do usuário não encontrado");
      return;
    }

    const emailChanges = changedFields.map((c) => `${c.field}: ${c.oldValue} → ${c.newValue}`);

    const emailBody =
      emailChanges.length > 0
        ? `<p>Olá ${user.name},</p>
            <p>Sua ordem de serviço foi atualizada com as seguintes alterações:</p>
            <ul>
              ${emailChanges.map((change) => `<li>${change}</li>`).join("")}
            </ul>
            <p>Obrigado pela preferência!</p>`
        : `<p>Olá ${user.name},</p>
            <p>Houve uma atualização na sua ordem de serviço.</p>
            <p>Obrigado pela preferência!</p>`;

    await this.emailService.sendEmail({
      to: user.email,
      subject: "Atualização na sua Ordem de Serviço",
      html: emailBody,
    });
  } catch (error) {
    console.error("Erro ao atualizar ordem:", error);
    throw error;
  }
}





    //done
    async getOneOrdem(id: number) {
        try {
            return await this.orderRepository.findById(id);
        } catch (error) {
            console.error('Erro ao selecionar ordem:', error);
            return null;
        }
    }
    //done
    async getAllOrdens() {
        try {
            return await this.orderRepository.findAll();
        }catch (error) {
            console.error('Erro ao selecionar ordens:', error);
            return [];
        }
    }
async getOrdensByStore(storeId: number) {
  try {
    console.log('Fetching orders for store ID:', storeId);

    const orders = await this.orderRepository.findByStore(storeId);

    const ordersWithFirstImage = orders.map(order => ({
      ...order,
      firstImage:
        order.pictures && order.pictures.length > 0
          ? order.pictures[0].path
          : null,
    }));

    return ordersWithFirstImage;
  } catch (error) {
    console.error('Erro ao selecionar ordens por loja:', error);
    return [];
  }
}


    async createOrdem(data: {
    workerId: number;
    document: string;
    deviceId: number;
    userId: number;
    work: number; 
    problem: string;
    deadline: string;
    cost: number;
    status: string;
    storeId: number;
    userDeviceId: number;
    }) {
    console.log('Creating order with data:', data);
    
    const orderData: Partial<ServiceOrder> = {
        work: data.work,
        problem: data.problem,
        deadline: data.deadline ? new Date(data.deadline) : null,
        cost: data.cost,
        status: data.status,
        userDevice: { id: data.userDeviceId } as UserDevice,
        worker: { id: data.workerId } as StoreWorker,
        store: { id: data.storeId } as Store,
    };
    try {
        const newOrder = await this.orderRepository.createOrder(orderData);
        return newOrder;
        } catch (error) {
        console.error('Erro ao criar ordem:', error);
        throw error;
        }
    }
    async concluirOrdem(id: number) {
    try {
        await this.orderRepository.updateOrder(id, { status: 'completed', completed_at: new Date() });
        const email = await this.orderRepository.findUserEmailNameById(id);
        await this.emailService.sendEmail({
        to: email.email,
        subject: 'Ordem concluída',
        text: 'Ordem concluída, venha buscar seu aparelho ' + email.name + ' !',
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
    }


async getOrdensByStoreAndStatus(storeId: number, status: string) {
  try {
    console.log('Fetching orders for store ID and status:', storeId, status);

    const orders = await this.orderRepository.findByStoreAndStatus(storeId, status);

    const ordersWithFirstImage = orders.map(order => ({
      ...order,
      firstImage:
        order.pictures && order.pictures.length > 0
          ? order.pictures[0].path
          : null,
    }));

    return ordersWithFirstImage;
  } catch (error) {
    console.error('Erro ao selecionar ordens por loja e status:', error);
    return [];
  }
}

    async getOrdemHistory(id: number) {
        return this.orderRepository.selectOrderHistory(id);
    }

      async savePictures(orderId: number, imagePaths: string[]): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error('Ordem não encontrada');
    }

    const pictures = imagePaths.map((path) =>
      this.pictureRepository.create({ path, serviceOrder: order })
    );

    await this.pictureRepository.save(pictures);
  }
}


