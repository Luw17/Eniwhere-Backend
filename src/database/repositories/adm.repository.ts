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

  findAll(): Promise<Adm[]> {
    return this.admRepo.find();
  }

  findById(id: number): Promise<Adm | null> {
    return this.admRepo.findOneBy({ id });
  }

  findByUser(user: string): Promise<Adm | null> {
    return this.admRepo.findOneBy({ user });
  }

  findByCode(code: string): Promise<Adm | null> {
    return this.admRepo.findOneBy({ code });
  }

  async createAdm(data: Partial<Adm>): Promise<Adm> {
    const newAdm = this.admRepo.create(data);
    return this.admRepo.save(newAdm);
  }

  async updateAdm(id: number, data: Partial<Adm>): Promise<Adm | null> {
    await this.admRepo.update(id, data);
    return this.findById(id);
  }

  deleteAdm(id: number): Promise<void> {
    return this.admRepo.delete(id).then(() => {});
  }
}
