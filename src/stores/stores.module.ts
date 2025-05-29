import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/database/entities/store.entity';
import { StoreRepository } from 'src/database/repositories/store.repository';
import { AddressModule } from 'src/address/address.module';
import { AddressService } from 'src/address/address.service';
@Module({
  imports: [TypeOrmModule.forFeature([Store]),AddressModule],
  providers: [StoresService,StoreRepository,AddressService],
  exports: [StoresService],
  controllers: [StoresController],
})
export class StoresModule {}
