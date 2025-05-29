import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { AppUser } from "src/database/entities/user.entity";
import { Address } from "src/database/entities/address.entity";
import { AddressService } from "src/address/address.service";

@Injectable()
export class UsersService {

    constructor(private readonly databaseService: DatabaseService, private readonly addressService: AddressService) {
        console.log('DatabaseService:', this.databaseService);
    }
    async validateUser(usuario: string, senha: string) {
        return this.databaseService.validateUser(usuario, senha);
    }

    async getAllUsers(){
        return this.databaseService.selectUsers();
    }
    async getOneUser(id: number) {
        return this.databaseService.selectF(id);
    }
    async create(data) {
  // Verifica ou cria endereço, se necessário
  if (!data.address) {
    if (
      data.postal_code &&
      data.country &&
      data.state &&
      data.city &&
      data.neighborhood &&
      data.address_line
    ) {
      const addressExist = await this.addressService.verifyPostalCode(data.postal_code);
      if (addressExist) {
        data.address = addressExist.id;
      } else {
        const addressData: Partial<Address> = {
          postalCode: data.postal_code,
          country: data.country,
          state: data.state,
          city: data.city,
          neighborhood: data.neighborhood,
          addressLine: data.address_line,
        };
        try {
          const address = await this.addressService.insertAddress(addressData);
          data.address = address;
        } catch (error) {
          console.error('Error inserting address:', error);
          throw new Error('Failed to insert address');
        }
      }
    } else {
      throw new Error('Missing address or address fields');
    }
  }

  // Cria e insere o usuário
  const dataUser: Partial<AppUser> = {
    document: data.document,
    name: data.name,
    email: data.email,
    phone: data.phone,
    username: data.username,
    userPassword: data.userPassword,
    number: data.number,
    address: data.address ? { id: data.address } as Address : null,
  };

  try {
    console.log('Inserting user with data:', dataUser);
    return await this.databaseService.insertUser(dataUser);
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}


    async updateUser(id: number,body) {
        if(!body.address) {
            if(body.postal_code && body.country && body.state && body.city && body.neighborhood && body.address_line) {
            const addressExist = await this.addressService.verifyPostalCode(body.postal_code);
            if (addressExist) {
                body.address = addressExist.id;
            } else {
            const addressData: Partial<Address> = {
                postalCode: body.postal_code,
                country: body.country,
                state: body.state,
                city: body.city,
                neighborhood: body.neighborhood,
                addressLine: body.address_line,
            };
            try {
                const address = await this.addressService.insertAddress(addressData);
                body.address = address;
            } catch (error) {
                console.error('Error inserting address:', error);
            }
            }
        }
        }
        console.log('body', body);
        const {
            postal_code,
            country,
            state,
            city,
            neighborhood,
            address_line,
            ...cleanedBody
        } = body;

        console.log('cleanedBody', cleanedBody);
        return this.databaseService.update(id, cleanedBody);
    }

    async deleteUser(id: number){
        return this.databaseService.update(id, { active: false });
    }
    async verifyUser(cpf: string){
        return this.databaseService.verifyUser(cpf);
    }
    async getIdByCpf(cpf: string){
        return this.databaseService.getIdByDocument(cpf);
    }
    
    /*todo: acertar a parte de authcode
    async updateAuthCode(userId: number, arg1: { authCode: string; authCodeExpiresAt: number; }) {
        return this.databaseService.updateAuthCode(userId, {codigoAtivo: arg1.authCode, authCodeExpiresAt: arg1.authCodeExpiresAt});
      }
       
    async findOne(  authCode: string  ) {
        return this.databaseService.selectCode( authCode);
      }
         */


    async getUserDeviceByid(deviceId: number, userId: number) {
        return this.databaseService.selectUserDeviceById(deviceId,userId);
    }
}