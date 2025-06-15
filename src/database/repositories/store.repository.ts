import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>,
  ) {}

  // Busca todas as lojas, incluindo suas relações com Address, Orders e Codes
  async findAll(): Promise<Store[]> {
    return await this.storeRepo.find({
      where: { active: true }, // Filtra apenas lojas ativas
      relations: [], // Relaciona as entidades associadas
    });
  }

  // Busca uma loja pelo ID
  async findById(id: number): Promise<Store | null> {
    return await this.storeRepo.findOne({
      where: { id },
      relations: [], // Relaciona as entidades associadas
    });
  }

  // Cria uma nova loja
  async createStore(data: Partial<Store>): Promise<Store> {
    const newStore = this.storeRepo.create(data);
    return await this.storeRepo.save(newStore);
  }

  // Atualiza uma loja existente
  async updateStore(id: number, data: Partial<Store>): Promise<Store> {
    await this.storeRepo.update(id, data);
    return await this.findById(id);
  }

  // Deleta uma loja pelo ID
  async deleteStore(id: number): Promise<void> {
    await this.storeRepo.delete(id);
  }

  // Busca todas as lojas por nome
  async findByName(name: string): Promise<Store[]> {
    return await this.storeRepo.find({
      where: { name },
      relations: [],
    });
  }
  async validateStore(username: string, userPassword: string): Promise<Store | null> {
    const store = await this.storeRepo.findOne({
      where: { username, userPassword },
      select: ['id','email'],
    });
    return store ? store : null;
  }
    async findByUser(username: string): Promise<Store | null> {
      return await this.storeRepo.findOneBy({ username});
    }

}
