import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/database/entities/address.entity';
import { AddressRepository } from 'src/database/repositories/address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressService,AddressRepository],
  exports: [AddressService,AddressRepository],
})
export class AddressModule {


}
