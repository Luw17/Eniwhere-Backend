import { Injectable } from '@nestjs/common';
import { Address } from 'src/database/entities/address.entity';
import { AddressRepository } from 'src/database/repositories/address.repository';

@Injectable()
export class AddressService {

    constructor(private readonly addressRepository: AddressRepository) {}

    async verifyPostalCode(postalCode: string): Promise<Address | null> {
        try {
            const address = await this.addressRepository.findByPostalCode(postalCode);
            return address;
        } catch (error) {
            console.error('Erro ao verificar CEP:', error);
            return null;
        }
    }
    insertAddress(addressData: Partial<Address>) {
        try {
            return this.addressRepository.createAddress(addressData);
        } catch (error) {
            console.error('Erro ao inserir endereço:', error);
            throw error;
        }
    }

}
