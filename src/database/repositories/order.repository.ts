import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  // Busca todos os pedidos, incluindo suas relações com Store, UserDevice e logs
  async findAll(): Promise<Order[]> {
    return await this.orderRepo.find({
      relations: ['store', 'userDevice', 'logs'], // Relaciona as entidades associadas
    });
  }

  // Busca um pedido pelo ID
  async findById(id: number): Promise<Order | null> {
    return await this.orderRepo.findOne({
      where: { id },
      relations: ['store', 'userDevice', 'logs'], // Relaciona as entidades associadas
    });
  }

  // Cria um novo pedido
  async createOrder(data: Partial<Order>): Promise<Order> {
    const newOrder = this.orderRepo.create(data);
    return await this.orderRepo.save(newOrder);
  }

  // Atualiza um pedido existente
  async updateOrder(id: number, data: Partial<Order>): Promise<Order> {
    await this.orderRepo.update(id, data);
    return await this.findById(id);
  }

  // Deleta um pedido pelo ID
  async deleteOrder(id: number): Promise<void> {
    await this.orderRepo.delete(id);
  }

  // Busca todos os pedidos de uma loja específica
  async findByStoreId(storeId: number): Promise<Order[]> {
    return await this.orderRepo.find({
      where: { store: { id: storeId } },
      relations: ['store', 'userDevice', 'logs'],
    });
  }

  // Busca todos os pedidos de um usuário
  async findByUserDeviceId(userDeviceId: number): Promise<Order[]> {
    return await this.orderRepo.find({
      where: { userDevice: { id: userDeviceId } },
      relations: ['store', 'userDevice', 'logs'],
    });
  }
}
