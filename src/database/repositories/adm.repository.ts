import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adm } from '../entities/adm.entity';

@Injectable()
export class AdmRepository {
  constructor(
    @InjectRepository(Adm)
    private readonly admRepo: Repository<Adm>,
  ) {}

  async findAll(): Promise<Adm[]> {
    return await this.admRepo.find();
  }

  async findById(id: number): Promise<Adm | null> {
    return await this.admRepo.findOneBy({ id });
  }

  async findByUser(user: string): Promise<Adm | null> {
    return await this.admRepo.findOneBy({ user });
  }

  async findByCode(code: string): Promise<Adm | null> {
    return await this.admRepo.findOneBy({ code });
  }

  async createAdm(data: Partial<Adm>): Promise<Adm> {
    const newAdm = this.admRepo.create(data);
    return await this.admRepo.save(newAdm);
  }

  async updateAdm(id: number, data: Partial<Adm>): Promise<Adm> {
    await this.admRepo.update(id, data);
    return await this.findById(id);
  }

  async deleteAdm(id: number): Promise<void> {
    await this.admRepo.delete(id);
  }
}
