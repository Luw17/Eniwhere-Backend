import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { OrderRepository } from './repositories/order.repository';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';

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
    const match = users.find(u => u.user === user && u.password === password);
    if (match) return match.id;
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async insertUser(user: Partial<User>) {
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
        u.user === user.user &&
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

  async update(id: number, body: Partial<User>) {
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
      const orders = await this.orderRepository.findAll();
      return orders.map(order => ({
        ...order,
        userName: order.userDevice?.user?.name ?? null,
      }));
    } catch (error) {
      console.error('Erro ao selecionar ordens:', error);
      return [];
    }
  }

  async selectOrder(id: number) {
    try {
      const order = await this.orderRepository.findById(id);
      if (!order) return null;

      return {
        ...order,
        userName: order.userDevice?.user?.name ?? null,
      };
    } catch (error) {
      console.error('Erro ao selecionar ordem:', error);
      return null;
    }
  }

  async updateOrder(id: number, body: Partial<Order>) {
    try {
      const order = await this.orderRepository.findById(id);
      if (!order) return;
      await this.orderRepository.updateOrder(id, body);
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

  /* todo: sera modificada para a estrutura do novo banco
  async createOrder(data: {
    userDeviceId: number;
    storeId: number;
    picture: string;
    feedback: number;
    warranty: number;
  }) {
    try {
      await this.orderRepository.createOrder({
        userDevice: { id: data.userDeviceId } as any,
        store: { id: data.storeId } as any,
        picture: data.picture,
        created_at: new Date(),
        completed_at: null,
        feedback: data.feedback,
        warranty: data.warranty,
      });
    } catch (error) {
      console.error('Erro ao criar ordem:', error);
      throw error;
    }
  }
    */

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
}
