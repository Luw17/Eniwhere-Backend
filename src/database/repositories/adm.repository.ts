import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/adm.entity';

@Injectable()
export class AdmRepository {
  constructor(
    @InjectRepository(Admin)
    private readonly admRepo: Repository<Admin>,
  ) {}

  async findAll(): Promise<Admin[]> {
    return await this.admRepo.find();
  }

  async findById(id: number): Promise<Admin | null> {
    return await this.admRepo.findOneBy({ id });
  }

  async findByUser(username: string): Promise<Admin | null> {
    return await this.admRepo.findOneBy({ username});
  }

  async createAdm(data: Partial<Admin>): Promise<Admin> {
    const newAdm = this.admRepo.create(data);
    return await this.admRepo.save(newAdm);
  }

  async updateAdm(id: number, data: Partial<Admin>): Promise<Admin> {
    const adm = await this.findById(id);
    if (!adm) {
      throw new Error('Admin not found');
    }

    Object.assign(adm, data);
    return await this.admRepo.save(adm);
  }


  async deleteAdm(id: number): Promise<void> {
    await this.admRepo.delete(id);
  }
async validateAdmin(username: string, userPassword: string): Promise<{ id: number, email: string } | null> {
  const admin = await this.admRepo.findOneBy({ username, userPassword });
  return admin ? { id: admin.id, email: admin.email } : null;
}

  async findByEmail(email: string): Promise<Admin | null> {
    return await this.admRepo.findOneBy({ email });
  }

}
