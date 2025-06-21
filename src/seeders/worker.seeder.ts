import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { StoreWorker } from '../database/entities/worker.entity';
import { faker } from '@faker-js/faker';
import { Store } from '../database/entities/store.entity';
import { hashPassword } from '../utils/hash-password';

export class StoreWorkerSeeder implements Seeder {
  private generateUsername(name: string): string {
    const cleanName = name.toLowerCase().replace(/\s+/g, '');
    return `${cleanName}${faker.number.int({ min: 10, max: 99 })}`;
  }

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const storeWorkerRepository = dataSource.getRepository(StoreWorker);
    const storeRepository = dataSource.getRepository(Store);

    const stores = await storeRepository.find();
    if (stores.length === 0) {
      console.warn('⚠️ Nenhuma loja encontrada. Execute o seeder de Store antes.');
      return;
    }

    const workers: StoreWorker[] = [];

    for (let i = 0; i < 150; i++) {
      const store = faker.helpers.arrayElement(stores);
      const name = faker.person.fullName();
      const username = this.generateUsername(name);

      const worker = new StoreWorker();
      worker.name = name;
      worker.username = username;
      worker.email = faker.internet.email();
      worker.userPassword = await hashPassword('worker123');
      worker.store = store;

      workers.push(worker);
    }

    await storeWorkerRepository.save(workers);
    console.log('✅ 150 store workers gerados com sucesso!');
  }
}
