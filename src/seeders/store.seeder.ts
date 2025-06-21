import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Store } from '../database/entities/store.entity';
import { faker } from '@faker-js/faker';
import { Address } from '../database/entities/address.entity';
import { hashPassword } from '../utils/hash-password';

export class StoreSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const storeRepository = dataSource.getRepository(Store);
    const addressRepository = dataSource.getRepository(Address);

    const addresses = await addressRepository.find();
    if (addresses.length === 0) {
      console.warn('⚠️ Nenhum endereço encontrado. Execute o seeder de Address antes.');
      return;
    }

    const stores: Store[] = [];

    for (let i = 0; i < 100; i++) {
      const address = faker.helpers.arrayElement(addresses);

      const store = new Store();
      store.name = faker.company.name();
      store.document = faker.string.numeric(14);
      store.email = faker.internet.email();
      store.username = faker.internet.username();
      store.userPassword = await hashPassword('lojapadrao123'); 
      store.number = faker.number.int({ min: 1, max: 1000 });
      store.address = address;
      store.subscriptionEnd = faker.date.soon({ days: 365 });
      store.analytics = faker.datatype.boolean();
      store.active = faker.datatype.boolean();

      stores.push(store);
    }

    await storeRepository.save(stores);
    console.log('✅ 100 lojas geradas com sucesso!');
  }
}
