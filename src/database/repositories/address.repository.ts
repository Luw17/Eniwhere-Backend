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

  findAll(): Promise<Address[]> {
    return this.addressRepo.find();
  }

  findById(id: number): Promise<Address | null> {
    return this.addressRepo.findOneBy({ id });
  }

  findByPostalCode(postalCode: string): Promise<Address[]> {
    return this.addressRepo.find({
      where: { postalCode }, // Usar nome da propriedade da entidade
    });
  }

  async createAddress(address: Partial<Address>): Promise<Address> {
    const newAddress = this.addressRepo.create(address);
    return this.addressRepo.save(newAddress);
  }

  async updateAddress(id: number, data: Partial<Address>): Promise<Address | null> {
    await this.addressRepo.update(id, data);
    return this.findById(id);
  }

  deleteAddress(id: number): Promise<void> {
    return this.addressRepo.delete(id).then(() => {});
  }
}
