import { Injectable } from '@nestjs/common';
import { Address } from 'src/database/entities/address.entity';
import { Store } from 'src/database/entities/store.entity';
import { StoreRepository } from 'src/database/repositories/store.repository';
import { AddressService } from 'src/address/address.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StoresService {

    constructor(private readonly storeRepository: StoreRepository, private readonly addressService: AddressService) {}

    async validateStore(username: string, userPassword: string): Promise<{ id: number; email: string } | null> {
        const store = await this.storeRepository.findByUser(username);

        if (!store) {
            return null;
        }

        const passwordMatches = await bcrypt.compare(userPassword, store.userPassword);

        if (!passwordMatches) {
            return null;
        }

        return { id: store.id, email: store.email };
    }
    async getStores(): Promise<Store[]> {
        return this.storeRepository.findAll();
    }
    async getStoreById(id: number): Promise<Store | null> {
        return this.storeRepository.findById(id);
    }
    async createStore(store: {
        name: string;
        document: string;
        email: string;
        username: string;
        userPassword: string;
        number: number;
        address?: number;
        subscriptionEnd: Date;
        analytics?: boolean;
        active?: boolean;
        postal_code?: string;
        country?: string;
        state?: string;
        city?: string;
        neighborhood?: string;
        address_line?: string;
        }): Promise<Store> {
        // Se não tiver ID de endereço, tenta criar ou localizar
        if (!store.address) {
            if (
            store.postal_code &&
            store.country &&
            store.state &&
            store.city &&
            store.neighborhood &&
            store.address_line
            ) {
            const addressExist = await this.addressService.verifyPostalCode(store.postal_code);
            if (addressExist) {
                store.address = addressExist.id;
            } else {
                const addressData: Partial<Address> = {
                postalCode: store.postal_code,
                country: store.country,
                state: store.state,
                city: store.city,
                neighborhood: store.neighborhood,
                addressLine: store.address_line,
                };
                try {
                const address = await this.addressService.insertAddress(addressData);
                store.address = address; // <- cuidado: `address`, não `Address`
                } catch (error) {
                console.error('Error inserting address:', error);
                throw new Error('Failed to create address');
                }
            }
            } else {
            throw new Error('Missing address or address fields');
            }
        }
        // Criação da Store
        const newStore: Partial<Store> = {
            name: store.name,
            document: store.document,
            email: store.email,
            username: store.username,
            userPassword: store.userPassword,
            number: store.number,
            address: { id: store.address } as Address,
            subscriptionEnd: store.subscriptionEnd,
            analytics: store.analytics || false,
            active: store.active ?? true,
        };

        return this.storeRepository.createStore(newStore);
    }

    async updateStore(id: number, store: Partial<Store>): Promise<Store | null> {
        if (store.userPassword) {
            const saltRounds = 10;
            store.userPassword = await bcrypt.hash(store.userPassword, saltRounds);
        }
        return this.storeRepository.updateStore(id, store);
    }
    async deleteStore(id: number): Promise<Store | null> {
        return this.storeRepository.updateStore(id, { active: false });
    }

    async findByEmail(email: string): Promise<Store | null> {
        return this.storeRepository.findByEmail(email);
    }
    async updatePassword(id: number, newPassword: string): Promise<Store | null> {
        return this.storeRepository.updateStore(id, { userPassword: newPassword });
    }
}
