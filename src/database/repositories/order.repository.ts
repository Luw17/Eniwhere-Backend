import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/service_order.entity';

@Injectable()
export class ServiceOrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly serviceOrderRepo: Repository<Order>,
  ) {}

  // Busca todos os pedidos, incluindo suas relações com Store, UserDevice e logs
  findAll(): Promise<Order[]> {
    return this.serviceOrderRepo.find({
      relations: ['store', 'userDevice', 'logs'], // Relaciona as entidades associadas
    });
  }

  // Busca um pedido pelo ID
  findById(id: number): Promise<Order | null> {
    return this.serviceOrderRepo.findOne({
      where: { id },
      relations: ['store', 'userDevice', 'logs'], // Relaciona as entidades associadas
    });
  }

  // Cria um novo pedido
  async createOrder(data: Partial<Order>): Promise<Order> {
    const newServiceOrder = this.serviceOrderRepo.create(data);
    return this.serviceOrderRepo.save(newServiceOrder);
  }

  // Atualiza um pedido existente
  async updateOrder(id: number, data: Partial<Order>): Promise<Order | null> {
    await this.serviceOrderRepo.update(id, data);
    return this.findById(id);
  }

  // Deleta um pedido pelo ID
  async deleteOrder(id: number): Promise<void> {
    await this.serviceOrderRepo.delete(id);
  }

}
