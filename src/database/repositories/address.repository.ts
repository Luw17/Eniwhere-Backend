import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}

  async findAll(): Promise<Address[]> {
    return await this.addressRepo.find();
  }

  async findById(id: number): Promise<Address | null> {
    return await this.addressRepo.findOneBy({ id });
  }

  async findByPostalCode(postalCode: string): Promise<Address[]> {
    return await this.addressRepo.find({
      where: { postal_code: postalCode },
    });
  }

  async createAddress(address: Partial<Address>): Promise<Address> {
    const newAddress = this.addressRepo.create(address);
    return await this.addressRepo.save(newAddress);
  }

  async updateAddress(id: number, data: Partial<Address>): Promise<Address> {
    await this.addressRepo.update(id, data);
    return await this.findById(id);
  }

  async deleteAddress(id: number): Promise<void> {
    await this.addressRepo.delete(id);
  }
}
