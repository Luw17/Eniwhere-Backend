import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { AppUser } from './entities/user.entity';
import { UserDeviceRepository } from './repositories/user-device.repository';


//todo: modificar quase tudo para a estrutura do novo banco
//modificar primeiro a parte de criar ordem

@Injectable()
export class DatabaseService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly userDeviceRepository: UserDeviceRepository,
  ) {}

  async selectUsers() {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      console.error('Erro ao selecionar usuários:', error);
      return [];
    }
  }

async validateUser(user: string, password: string) {
  const users = await this.userRepository.findAll();
  const match = users.find(u => u.username === user && u.userPassword === password);
  if (match) {
    return {
      id: match.id,
      email: match.email,
    };
  }
  return null;
}


  async insertUser(user: Partial<AppUser>) {
    try {
      return await this.userRepository.createUser(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new UnauthorizedException('Documento já cadastrado');
      }
      throw error;
    }
  }

  async verifyUser(document: string) {
    try {
      const users = await this.userRepository.findAll();
      return users.some(u => u.document === document);
    } catch (error) {
      return false;
    }
  }



  async selectF(id: number) {
    try {
      return await this.userRepository.findById(id);
    } catch {
      return null;
    }
  }

  async update(id: number, body: Partial<AppUser>) {
    try {
      await this.userRepository.updateUser(id, body);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      await this.userRepository.deleteUser(id);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }



  async getIdByDocument(document: string) {
    try {
      const users = await this.userRepository.findAll();
      const user = users.find(u => u.document === document);
      return user?.id ?? null;
    } catch (error) {
      console.error('Erro ao buscar usuário por documento:', error);
      return null;
    }
  }
  async selectUserDeviceById(deviceId: number, userId: number): Promise<number | null> {
  try {
    const userDevice = await this.userDeviceRepository.findDevice(deviceId, userId);
    if (userDevice) {
      return userDevice.id;
    }
    const newUserDevice = this.userDeviceRepository.createDevice(deviceId, userId);

    const savedUserDevice = await this.userDeviceRepository.saveDevice(newUserDevice);
    return savedUserDevice.id;

  } catch (error) {
    console.error('Erro ao selecionar ou criar dispositivo do usuário:', error);
    return null;
  }
}

}

