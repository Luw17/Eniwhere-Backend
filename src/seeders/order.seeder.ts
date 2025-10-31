import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ServiceOrder } from '../database/entities/service_order.entity';
import { UserDevice } from '../database/entities/user_has_device.entity';
import { StoreWorker } from '../database/entities/worker.entity';
import { Store } from '../database/entities/store.entity';
import { faker } from '@faker-js/faker';

export class ServiceOrderSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const soRepository = dataSource.getRepository(ServiceOrder);
    const userDeviceRepository = dataSource.getRepository(UserDevice);
    const workerRepository = dataSource.getRepository(StoreWorker);
    const storeRepository = dataSource.getRepository(Store);

    const userDevices = await userDeviceRepository.find();
    const workers = await workerRepository.find();
    const stores = await storeRepository.find();

    if (!userDevices.length || !workers.length || !stores.length) {
      console.warn('⚠️ Execute os seeders de UserDevice, StoreWorker e Store antes de gerar as ordens.');
      return;
    }

    const orders: ServiceOrder[] = [];

    for (let i = 0; i < 500; i++) {
      const order = new ServiceOrder();

      const createdAt = faker.date.past({ years: 1 });
      const status = faker.helpers.arrayElement(['pending', 'in_progress', 'completed', 'cancelled']);

      order.userDevice = faker.helpers.arrayElement(userDevices);
      order.worker = faker.helpers.arrayElement(workers);
      order.store = faker.helpers.arrayElement(stores);
      order.status = status;
      order.created_at = createdAt;

      // Regras por status
      switch (status) {
        case 'completed': {
          order.deadline = faker.date.soon({ days: faker.number.int({ min: 3, max: 7 }), refDate: createdAt });
          order.completed_at = faker.date.between({ from: createdAt, to: faker.date.soon({ days: 7, refDate: createdAt }) });
          order.feedback = faker.number.int({ min: 1, max: 5 });
          order.warranty = faker.number.int({ min: 0, max: 12 });
          order.cost = faker.number.float({ min: 200, max: 1500, fractionDigits: 2 });
          order.work = faker.number.float({ min: 20, max: 1000, fractionDigits: 2 });
          order.problem = faker.lorem.sentence();
          break;
        }

        case 'in_progress': {
          order.deadline = faker.date.soon({ days: faker.number.int({ min: 3, max: 10 }), refDate: createdAt });
          order.cost = faker.number.float({ min: 200, max: 1500, fractionDigits: 2 });
          order.work = faker.number.float({ min: 20, max: 1000, fractionDigits: 2 });
          order.problem = faker.lorem.sentence();
          break;
        }

        case 'pending': {
          order.problem = faker.lorem.sentence();
          break;
        }

        case 'cancelled': {
          order.problem = faker.lorem.sentence();
          break;
        }
      }

      orders.push(order);
    }

    await soRepository.save(orders);
    console.log('✅ 150 ordens de serviço realistas geradas com sucesso!');
  }
}
