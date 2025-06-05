import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreWorker } from '../entities/worker.entity';

@Injectable()
export class WorkerRepository {
  constructor(
    @InjectRepository(StoreWorker)
    private readonly workerRepo: Repository<StoreWorker>,
  ) {}

  // Busca todos os trabalhadores
  async findAll(): Promise<StoreWorker[]> {
    return await this.workerRepo.find({
      relations: [],
    });
  }

  // Busca um trabalhador pelo ID
  async findById(id: number): Promise<StoreWorker | null> {
    return await this.workerRepo.findOne({
      where: { id },
      relations: [],
    });
  }
  async findLogin(username: string, userPassword: string): Promise<StoreWorker | null> {
    return await this.workerRepo.findOne({
      where: { username, userPassword },
      select:['id'],
      relations: [],
    });
  }

  // Cria um novo trabalhador
  async createWorker(data: Partial<StoreWorker>): Promise<StoreWorker> {
    const newWorker = this.workerRepo.create(data);
    return await this.workerRepo.save(newWorker);
  }

  // Atualiza um trabalhador existente
  async updateWorker(id: number, data: Partial<StoreWorker>): Promise<StoreWorker> {
    await this.workerRepo.update(id, data);
    return await this.findById(id);
  }

  // Deleta um trabalhador pelo ID
  async deleteWorker(id: number): Promise<void> {
    await this.workerRepo.delete(id);
  }
}

