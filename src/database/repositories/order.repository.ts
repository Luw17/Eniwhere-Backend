import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceOrder } from '../entities/service_order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(ServiceOrder)
    private readonly orderRepo: Repository<ServiceOrder>,
  ) {}
  findAll(): Promise<ServiceOrder[]> {
    return this.orderRepo.find({
      order: { created_at: 'DESC' },
    });
  }
async findByStoreAndStatus(storeId: number, status: string): Promise<ServiceOrder[]> {
  return this.orderRepo.find({
    where: { store: { id: storeId }, status },
    relations: [],
  });
}

  // Busca uma ordem pelo ID
  findById(id: number): Promise<ServiceOrder | null> {
    return this.orderRepo.findOne({
      where: { id },
      relations: ['worker', 'userDevice'],
    });
  }

  // Cria uma nova ordem
  async createOrder(data: Partial<ServiceOrder>): Promise<ServiceOrder> {
    const newOrder = this.orderRepo.create(data);
    return this.orderRepo.save(newOrder);
  }

  // Atualiza uma ordem existente
  async updateOrder(id: number, data: Partial<ServiceOrder>): Promise<ServiceOrder | null> {
    await this.orderRepo.update(id, data);
    return this.findById(id);
  }

  // Remove uma ordem
  async deleteOrder(id: number): Promise<void> {
    await this.orderRepo.delete(id);
  }

  // Busca ordens por ID do trabalhador
  findByWorkerId(workerId: number): Promise<ServiceOrder[]> {
    return this.orderRepo.find({
      where: { worker: { id: workerId } },
      relations: ['worker', 'userDevice'],
    });
  }

  // Busca ordens por status
  findByStatus(status: string): Promise<ServiceOrder[]> {
    return this.orderRepo.find({
      where: { status },
      relations: ['worker', 'userDevice'],
    });
  }
}
