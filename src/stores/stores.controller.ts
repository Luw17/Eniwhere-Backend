import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { Store } from 'src/database/entities/store.entity';
import { AddressService } from 'src/address/address.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller()
@UseGuards(RolesGuard)
export class StoresController {
  constructor(private readonly storesService: StoresService, private readonly addressService: AddressService) {}

  //ok
  @Get('stores')
  @Roles('admin')
  getStores(): Promise<Store[]> {
    return this.storesService.getStores();
  }

  //ok
  @Get('stores/:id')
  @Roles('admin')
  getStoreById(@Param('id') id: number): Promise<Store | null> {
    return this.storesService.getStoreById(id);
  }

  //ok
  @Post('stores')
  @Roles('admin')
 createStore(@Body() store: { name: string; document: string; email: string; username: string; userPassword: string; number: number; Date; address: number;
    subscriptionEnd: Date; analytics?: boolean; active?: boolean; postal_code?: string; country?: string; state?: string; city?: string; neighborhood?: string; address_line?: string; 
  }): Promise<Store> {
    console.log('Creating store with data:', store);
    return this.storesService.createStore(store);
  }

  //ok
  @Put('stores/:id')
  @Roles('admin')
  updateStore(@Param('id') id: number, @Body() store: Store): Promise<Store | null> {
    return this.storesService.updateStore(id, store);
  }

  //ok
  @Delete('stores/:id')
  @Roles('admin')
  deleteStore(@Param('id') id: number): Promise<Store | null> {
    return this.storesService.deleteStore(id);
  }
}
