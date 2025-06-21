import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { AppUser } from '../database/entities/user.entity';
import { faker } from '@faker-js/faker';
import { Address } from '../database/entities/address.entity';
import { hashPassword } from '../utils/hash-password';

export class AppUserSeeder implements Seeder {
  private generateBrazilianPhone(): string {
    const ddd = faker.string.numeric(2);
    const firstPart = faker.string.numeric(5);
    const secondPart = faker.string.numeric(4);
    return `(${ddd}) ${firstPart}-${secondPart}`;
  }

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userRepository = dataSource.getRepository(AppUser);
    const addressRepository = dataSource.getRepository(Address);

    const addresses = await addressRepository.find();
    if (addresses.length === 0) {
      console.warn('⚠️ Nenhum endereço encontrado. Execute o seeder de Address antes.');
      return;
    }

    const users: AppUser[] = [];

    for (let i = 0; i < 200; i++) {
      const address = faker.helpers.arrayElement(addresses);

      const user = new AppUser();
      user.document = faker.string.numeric(11); // CPF fake
      user.name = faker.person.fullName();
      user.email = faker.internet.email();
      user.phone = this.generateBrazilianPhone();
      user.username = faker.internet.username();
      user.userPassword = await hashPassword('12345678');
      user.number = faker.string.numeric(4);
      user.address = address;
      user.active = true;

      users.push(user);
    }

    await userRepository.save(users);
    console.log('✅ 200 usuários gerados com sucesso!');
  }
}
