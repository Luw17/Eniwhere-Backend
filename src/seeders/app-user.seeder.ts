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

    // 👤 Usuários fixos para testes
    const fixedUsers = [
      { document: '00000000001', name: 'Usuário Teste 1', email: 'teste1@email.com', username: 'teste1' },
      { document: '00000000002', name: 'Usuário Teste 2', email: 'teste2@email.com', username: 'teste2' },
      { document: '00000000003', name: 'Usuário Teste 3', email: 'teste3@email.com', username: 'teste3' },
      { document: '00000000004', name: 'Usuário Teste 4', email: 'teste4@email.com', username: 'teste4' },
      { document: '00000000005', name: 'Usuário Teste 5', email: 'teste5@email.com', username: 'teste5' },
    ];

    for (const fixed of fixedUsers) {
      const user = new AppUser();
      user.document = fixed.document;
      user.name = fixed.name;
      user.email = fixed.email;
      user.username = fixed.username;
      user.phone = this.generateBrazilianPhone();
      user.userPassword = await hashPassword('12345678');
      user.number = faker.string.numeric(4);
      user.address = faker.helpers.arrayElement(addresses);
      user.active = true;

      users.push(user);
    }

    // 👥 Usuários aleatórios
    for (let i = 0; i < 200; i++) {
      const user = new AppUser();
      user.document = faker.string.numeric(11);
      user.name = faker.person.fullName();
      user.email = faker.internet.email();
      user.username = faker.internet.username();
      user.phone = this.generateBrazilianPhone();
      user.userPassword = await hashPassword('12345678');
      user.number = faker.string.numeric(4);
      user.address = faker.helpers.arrayElement(addresses);
      user.active = true;

      users.push(user);
    }

    await userRepository.save(users);
    console.log(`✅ ${users.length} usuários gerados com sucesso!`);
  }
}
