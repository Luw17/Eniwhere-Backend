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
async findByStoreAndStatus(storeId: number, status: string): Promise<any[]> {
  const raw = await this.orderRepo
    .createQueryBuilder('order')
    .leftJoin('order.userDevice', 'userDevice')
    .leftJoin('userDevice.user', 'user')
    .leftJoin('userDevice.device', 'device')
    .leftJoin('order.pictures', 'pictures')  // join nas imagens
    .where('order.store_id = :storeId', { storeId })
    .andWhere('order.status = :status', { status })
    .orderBy('order.created_at', 'DESC')
    .select([
      'order.id AS order_id',
      'order.created_at AS order_created_at',
      'order.completed_at AS order_completed_at',
      'order.feedback AS order_feedback',
      'order.warranty AS order_warranty',
      'order.cost AS order_cost',
      'order.work AS order_work',
      'order.status AS order_status',
      'order.deadline AS order_deadline',
      'order.problem AS order_problem',
      'user.id AS user_id',
      'user.name AS user_name',
      'device.id AS device_id',
      'device.deviceName AS device_deviceName',
      'device.brand AS device_brand',
      'device.model AS device_model',
      'pictures.id AS picture_id',
      'pictures.path AS picture_path',
    ])
    .getRawMany();

  // Agrupar imagens por ordem
  const ordersMap = new Map<number, any>();

  for (const row of raw) {
    let order = ordersMap.get(row.order_id);
    if (!order) {
      order = {
        id: row.order_id,
        created_at: row.order_created_at,
        completed_at: row.order_completed_at,
        feedback: row.order_feedback,
        warranty: row.order_warranty,
        cost: row.order_cost,
        work: row.order_work,
        status: row.order_status,
        deadline: row.order_deadline,
        problem: row.order_problem,
        userDevice: {
          user: {
            id: row.user_id,
            name: row.user_name,
          },
          device: {
            id: row.device_id,
            deviceName: row.device_deviceName,
            brand: row.device_brand,
            model: row.device_model,
          },
        },
        pictures: [],
      };
      ordersMap.set(row.order_id, order);
    }
    if (row.picture_id) {
      order.pictures.push({
        id: row.picture_id,
        path: row.picture_path,
      });
    }
  }

  return Array.from(ordersMap.values());
}






  // Busca uma ordem pelo ID
findById(id: number): Promise<ServiceOrder | null> {
  return this.orderRepo
    .createQueryBuilder('order')
    .leftJoin('order.worker', 'worker')
    .leftJoin('order.store', 'store')
    .leftJoinAndSelect('order.pictures', 'pictures')
    .select([
      'order.id',
      'order.created_at',
      'order.completed_at',
      'order.feedback',
      'order.warranty',
      'order.cost',
      'order.work',
      'order.status',
      'order.deadline',
      'order.problem',
      'worker.name',
      'store.name',
      'pictures.id',
      'pictures.path',
    ])
    .where('order.id = :id', { id })
    .getOne();
}

  
findByStore(storeId: number): Promise<ServiceOrder[]> {
  return this.orderRepo
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.userDevice', 'userDevice')
    .leftJoinAndSelect('userDevice.user', 'user')
    .leftJoinAndSelect('userDevice.device', 'device')
    .leftJoinAndSelect('order.pictures', 'pictures')  // aqui adiciona as imagens
    .where('order.store_id = :storeId', { storeId })
    .orderBy('order.created_at', 'DESC')
    .select([
      'order.id',
      'order.created_at',
      'order.completed_at',
      'order.feedback',
      'order.warranty',
      'order.cost',
      'order.work',
      'order.status',
      'order.deadline',
      'order.problem',
      'user.name',
      'user.id',
      'device.deviceName',
      'device.brand',
      'device.model',
      'device.id',
      'userDevice.id',
      'pictures.id',       // precisa selecionar o id da picture
      'pictures.path',     // e o caminho da imagem
    ])
    .getMany();
}



  // Cria uma nova ordem
async createOrder(orderData: Partial<ServiceOrder>): Promise<ServiceOrder> {
  try {
    const newOrder = this.orderRepo.create(orderData);
    const savedOrder = await this.orderRepo.save(newOrder);
    return savedOrder; // Retorna a ordem salva com ID
  } catch (error) {
    console.error('Erro ao criar ordem de serviço:', error);
    throw error; // Repassa o erro para o controller tratar
  }
}


async updateOrder(id: number, data: Partial<ServiceOrder>): Promise<boolean> {
  try {
    await this.orderRepo.update(id, data);
    return true;
  } catch (error) {
    console.error('Erro ao atualizar ordem de serviço:', error);
    return false;
  }
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
      relations: ['worker', 'userDevice','pictures'],
    });
  }
  findUserEmailNameById(id:number){
    return this.orderRepo
    .createQueryBuilder('so')
    .leftJoin('so.userDevice', 'ud')
    .leftJoin('ud.user', 'user')
    .select(['user.name AS name', 'user.email AS email'])
    .where('so.id = :id', { id: id })
    .getRawOne();
  }
  selectOrderHistory(id: number): Promise<ServiceOrder | null> {
    return this.orderRepo.findOne({
      where: { id: id },
      relations: ['logs'],
      order: {
        logs: {
          logDate: 'DESC', 
        },
      },
    });
  }
}
