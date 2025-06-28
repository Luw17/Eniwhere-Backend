import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { AdminSeeder } from './admin.seeder';
import { AddressSeeder } from './address.seeder';
import { AppUserSeeder } from './app-user.seeder';
import { StoreSeeder } from './store.seeder';
import { StoreWorkerSeeder } from './worker.seeder';
import { UserDeviceSeeder } from './user-device.seeder';
import { ServiceOrderSeeder } from './order.seeder';
import { OrderLogSeeder } from './orderLog.seeder';

export class MasterSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await new AddressSeeder().run(dataSource, factoryManager);
    await new AdminSeeder().run(dataSource);
    await new AppUserSeeder().run(dataSource, factoryManager);
    await new StoreSeeder().run(dataSource, factoryManager);
    await new StoreWorkerSeeder().run(dataSource, factoryManager);
    await new UserDeviceSeeder().run(dataSource, factoryManager);
    await new ServiceOrderSeeder().run(dataSource, factoryManager);
    await new OrderLogSeeder().run(dataSource);
    // Aqui você pode adicionar quantos seeders quiser na ordem correta
  }
}
