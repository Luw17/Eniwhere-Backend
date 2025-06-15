import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderLog } from '../entities/order_log.entity';

@Injectable()
export class OrderLogRepository {
  constructor(
    @InjectRepository(OrderLog)
    private readonly orderLogRepo: Repository<OrderLog>,
  ) {}

  // Busca todos os logs de pedidos com o relacionamento de Order
  findAll(): Promise<OrderLog[]> {
    return this.orderLogRepo.find({
      relations: ['order'], // Relaciona o log com o pedido
    });
  }

  // Busca um log pelo ID
  findById(id: number): Promise<OrderLog | null> {
    return this.orderLogRepo.findOne({
      where: { id },
      relations: ['order'], // Relaciona o log com o pedido
    });
  }

  // Cria um novo log de pedido
  async save(data: Partial<OrderLog>): Promise<OrderLog> {
    const newOrderLog = this.orderLogRepo.create(data);
    return this.orderLogRepo.save(newOrderLog);
  }

  // Atualiza um log de pedido existente
  async updateOrderLog(id: number, data: Partial<OrderLog>): Promise<OrderLog | null> {
    await this.orderLogRepo.update(id, data);
    return this.findById(id);
  }

  // Deleta um log de pedido pelo ID
  async deleteOrderLog(id: number): Promise<void> {
    await this.orderLogRepo.delete(id);
  }

  // Busca logs de um pedido específico pelo ID do pedido
  findByOrderId(orderId: number): Promise<OrderLog[]> {
    return this.orderLogRepo.find({
      where: { serviceOrder: { id: orderId } },
      relations: ['order'],
    });
  }
}
