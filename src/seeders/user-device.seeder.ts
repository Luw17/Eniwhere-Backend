import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserDevice } from '../database/entities/user_has_device.entity';
import { AppUser } from '../database/entities/user.entity';
import { Device } from '../database/entities/device.entity';
import { faker } from '@faker-js/faker';

export class UserDeviceSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userDeviceRepository = dataSource.getRepository(UserDevice);
    const userRepository = dataSource.getRepository(AppUser);
    const deviceRepository = dataSource.getRepository(Device);

    const users = await userRepository.find();
    const devices = await deviceRepository.find();

    if (users.length === 0) {
      console.warn('⚠️ Nenhum usuário encontrado. Execute o seeder de AppUser antes.');
      return;
    }

    if (devices.length === 0) {
      console.warn('⚠️ Nenhum dispositivo encontrado. Execute o seeder de Device antes.');
      return;
    }

    const userDevices: UserDevice[] = [];

    // Cria 200 associações aleatórias
    for (let i = 0; i < 200; i++) {
      const userDevice = new UserDevice();
      userDevice.user = faker.helpers.arrayElement(users);
      userDevice.device = faker.helpers.arrayElement(devices);

      userDevices.push(userDevice);
    }

    await userDeviceRepository.save(userDevices);
    console.log('✅ 200 UserDevices gerados com sucesso!');
  }
}
