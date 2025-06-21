import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Admin } from '../database/entities/adm.entity';
import { faker } from '@faker-js/faker';

export class AdminSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Admin);

    const fixedAdmin = await repo.findOne({ where: { username: 'Luw' } });
    if (!fixedAdmin) {
      const admin = repo.create({
        username: 'Luw',
        userPassword: 'luw12345',
        email: 'luisflavio360@gmail.com',
      });
      await repo.save(admin);
      console.log('Admin fixo "Luw" criado.');
    } else {
      console.log('Admin fixo "Luw" já existe.');
    }

    for (let i = 0; i < 9; i++) {
      const username = faker.internet.username();
      const email = faker.internet.email();
      const password = 'Senha123!';

      const exists = await repo.findOne({ where: { username } });
      if (exists) continue;

      const admin = repo.create({
        username,
        userPassword: password,
        email,
      });

      await repo.save(admin);
      console.log(`Admin aleatório "${username}" criado.`);
    }
  }
}
