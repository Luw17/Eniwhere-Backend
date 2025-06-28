import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ServiceOrder } from '../database/entities/service_order.entity';
import { OrderLog } from '../database/entities/order_log.entity';
import { faker } from '@faker-js/faker';

export class OrderLogSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const orderRepository = dataSource.getRepository(ServiceOrder);
    const logRepository = dataSource.getRepository(OrderLog);

    const orders = await orderRepository.find({ relations: ['store', 'userDevice', 'worker'] });

    if (!orders.length) {
      console.warn('⚠️ Nenhuma ordem de serviço encontrada. Execute o ServiceOrderSeeder primeiro.');
      return;
    }

    const logs: OrderLog[] = [];

    for (const order of orders) {
      let logDate = new Date(order.created_at);
      const transitions: OrderLog[] = [];

      if (order.status !== 'pending') {
        transitions.push(this.createLog(order, {
          status: 'pending',
          logDate: this.advanceDate(logDate, 0),
          cost: null,
          work: null,
          deadline: null,
          problem: faker.datatype.boolean() ? order.problem : null,
        }));

        logDate = this.advanceDate(logDate, 1);
      }
      if (['in_progress', 'completed'].includes(order.status)) {
        transitions.push(this.createLog(order, {
          status: 'in_progress',
          logDate,
          cost: order.cost,
          work: order.work,
          deadline: order.deadline,
          problem: order.problem,
        }));

        logDate = this.advanceDate(logDate, 2);
      }
      if (order.status === 'completed' && order.completed_at) {
        transitions.push(this.createLog(order, {
          status: 'completed',
          logDate: order.completed_at,
          cost: order.cost,
          work: order.work,
          deadline: order.deadline,
          problem: order.problem,
        }));

        logDate = this.advanceDate(order.completed_at, 1);
      }
      if (order.status === 'cancelled') {
        transitions.push(this.createLog(order, {
          status: 'cancelled',
          logDate,
          problem: order.problem,
        }));

        logDate = this.advanceDate(logDate, 1);
      }
      const extraChanges = faker.number.int({ min: 0, max: 2 });
      for (let i = 0; i < extraChanges; i++) {
        const changedFields = {
          cost: faker.datatype.boolean() ? faker.number.float({ min: 100, max: 2000, fractionDigits: 2 }) : null,
          work: faker.datatype.boolean() ? faker.number.float({ min: 50, max: 1500, fractionDigits: 2 }) : null,
          deadline: faker.datatype.boolean() ? faker.date.soon({ days: 20, refDate: logDate }) : null,
          problem: faker.datatype.boolean() ? faker.lorem.sentence() : null,
        };

        transitions.push(this.createLog(order, {
          status: null,
          logDate: logDate,
          ...changedFields,
        }));

        logDate = this.advanceDate(logDate, faker.number.int({ min: 1, max: 5 }));
      }

      logs.push(...transitions);
    }

    await logRepository.save(logs);
    console.log(`✅ ${logs.length} logs de alteração de ordens gerados com sucesso!`);
  }

  private createLog(
    order: ServiceOrder,
    data: {
      status: string | null;
      cost?: number | null;
      work?: number | null;
      deadline?: Date | null;
      problem?: string | null;
      logDate: Date;
    }
  ): OrderLog {
    const log = new OrderLog();
    log.serviceOrder = order;
    log.status = data.status;
    log.cost = data.cost ?? null;
    log.work = data.work ?? null;
    log.deadline = data.deadline ?? null;
    log.problem = data.problem ?? null;
    log.logDate = data.logDate;
    return log;
  }

  private advanceDate(base: Date, days: number): Date {
    const result = new Date(base);
    result.setDate(result.getDate() + days);
    return result;
  }
}
