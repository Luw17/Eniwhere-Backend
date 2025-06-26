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

    if (userDevices.length === 0) {
      console.warn('⚠️ Nenhum UserDevice encontrado. Execute o seeder correspondente.');
      return;
    }
    if (workers.length === 0) {
      console.warn('⚠️ Nenhum StoreWorker encontrado. Execute o seeder correspondente.');
      return;
    }
    if (stores.length === 0) {
      console.warn('⚠️ Nenhuma Store encontrada. Execute o seeder correspondente.');
      return;
    }

    const orders: ServiceOrder[] = [];

    for (let i = 0; i < 1500; i++) {
      const order = new ServiceOrder();

      order.userDevice = faker.helpers.arrayElement(userDevices);
      order.worker = faker.helpers.arrayElement(workers);
      order.store = faker.helpers.arrayElement(stores);

      order.created_at = faker.date.past({ years: 1 }); // até 1 ano atrás

      // completed_at pode ser depois de created_at ou null (ordem em aberto)
      order.completed_at = faker.datatype.boolean()
        ? faker.date.between({ from: order.created_at, to: new Date() })
        : null;

      order.feedback = faker.datatype.boolean() ? faker.number.int({ min: 1, max: 5 }) : null;
      order.warranty = faker.datatype.boolean() ? faker.number.int({ min: 0, max: 12 }) : null;

      order.cost = faker.datatype.boolean()
        ? faker.number.float({ min: 200, max: 1500, fractionDigits: 2 })
        : null;

      order.work = faker.datatype.boolean()
        ? faker.number.float({ min: 20, max: 1000, fractionDigits: 2 })
        : null;

      order.status = faker.helpers.arrayElement(['pending', 'in_progress', 'completed', 'cancelled']);

      order.deadline = faker.datatype.boolean() ? faker.date.soon({ days: 30 }) : null;

      order.problem = faker.datatype.boolean() ? faker.lorem.sentence() : null;

      orders.push(order);
    }

    await soRepository.save(orders);
    console.log('✅ 1500 ordens de serviço geradas com sucesso!');
  }
}
