import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceOrder } from '../entities/service_order.entity';

@Injectable()
export class ServiceOrderRepository {
  constructor(
    @InjectRepository(ServiceOrder)
    private readonly ServiceOrderRepo: Repository<ServiceOrder>,
  ) {}

  // Busca todos os pedidos, incluindo suas relações com Store, UserDevice e logs
  async findAll(): Promise<ServiceOrder[]> {
    return await this.ServiceOrderRepo.find({
      relations: ['store', 'userDevice', 'logs'], // Relaciona as entidades associadas
    });
  }

  // Busca um pedido pelo ID
  async findById(id: number): Promise<ServiceOrder | null> {
    return await this.ServiceOrderRepo.findOne({
      where: { id },
      relations: ['store', 'userDevice', 'logs'], // Relaciona as entidades associadas
    });
  }

  // Cria um novo pedido
  async createOrder(data: Partial<ServiceOrder>): Promise<ServiceOrder> {
    const newServiceOrder = this.ServiceOrderRepo.create(data);
    return await this.ServiceOrderRepo.save(newServiceOrder);
  }

  // Atualiza um pedido existente
  async updateOrder(id: number, data: Partial<ServiceOrder>): Promise<ServiceOrder> {
    await this.ServiceOrderRepo.update(id, data);
    return await this.findById(id);
  }

  // Deleta um pedido pelo ID
  async deleteOrder(id: number): Promise<void> {
    await this.ServiceOrderRepo.delete(id);
  }


  // Busca todos os pedidos de um usuário
  async findByUserDeviceId(userDeviceId: number): Promise<ServiceOrder[]> {
    return await this.ServiceOrderRepo.find({
      where: { userHasDevice: { id: userDeviceId } },
      relations: ['store', 'userDevice', 'logs'],
    });
  }
}
