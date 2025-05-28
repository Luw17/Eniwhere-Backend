import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { OrderRepository } from './repositories/order.repository';
import { AppUser } from './entities/user.entity';
import { UserDeviceRepository } from './repositories/user-device.repository';
import { OrderLogRepository } from './repositories/order-log.repository';
import { ServiceOrder } from './entities/service_order.entity'; 

//todo: modificar quase tudo para a estrutura do novo banco
//modificar primeiro a parte de criar ordem

@Injectable()
export class DatabaseService {
  getIdByCpf(cpf: string) {
      throw new Error("Method not implemented.");
  }
  constructor(
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderLogRepository: OrderLogRepository,
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
    if (match) return match.id;
    throw new UnauthorizedException('Credenciais inválidas');
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

  async verifyCode2f(user: { user: string; code: string }) {
    try {
      const users = await this.userRepository.findAll();
      const match = users.find(u =>
        u.username === user.user &&
        u.code === user.code &&
        u.validity &&
        u.validity > new Date(),
      );

      if (match) {
        match.code = null;
        match.validity = null;
        await this.userRepository.updateUser(match.id, match);
        return true;
      }
      return false;
    } catch {
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

  async selectOrders() {
    try {
      return await this.orderRepository.findAll();
    } catch (error) {
      console.error('Erro ao selecionar ordens:', error);
      return [];
    }
  }
  async selectOrdersByStoreAndStatus(storeId: number, status: string) {
    try {
      return await this.orderRepository.findByStoreAndStatus(storeId, status);
    } catch (error) {
      console.error('Erro ao selecionar ordens:', error);
      return [];
    }
  }

  async selectOrder(id: number) {
    try {
      return await this.orderRepository.findById(id);
    } catch (error) {
      console.error('Erro ao selecionar ordem:', error);
      return null;
    }
  }
  async selectOrdersByStore(storeId: number) {
    try {
      return await this.orderRepository.findByStore(storeId);
    } catch (error) {
      console.error('Erro ao selecionar ordens por loja:', error);
      return [];
    }
  }
  async updateOrder(id: number, data) {
    try {
      const order = await this.orderRepository.findById(id);
      if (!order) return;
      await this.orderRepository.updateOrder(id, data);
    } catch (error) {
      console.error('Erro ao atualizar ordem:', error);
    }
  }

  async deleteOrder(id: number) {
    try {
      const order = await this.orderRepository.findById(id);
      if (!order) return;
      await this.orderRepository.updateOrder(id, {
        completed_at: new Date(),
        status: 'cancelled',
      });
    } catch (error) {
      console.error('Erro ao deletar ordem:', error);
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

  /* todo: sera modificada para a estrutura do novo banco*/
  //{workerId:number,document:string,deviceId:number,userId:number, work: string, problem: string, deadline: string, cost: number, status: string, storeId: number,userDeviceId: number}
  async createOrder(orderData: Partial<ServiceOrder>) {
    try {
      const newOrder = await this.orderRepository.createOrder(orderData);
      return newOrder;
    } catch (error) {
      console.error('Erro ao criar ordem:', error);
      throw error;
    }
  }

  async updateAuthCode(
    userId: number,
    { code, validity }: { code: string; validity: number },
  ) {
    try {
      await this.userRepository.updateUser(userId, {
        code,
        validity: new Date(validity),
      });
    } catch (error) {
      console.error('Erro ao atualizar código de autenticação:', error);
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

