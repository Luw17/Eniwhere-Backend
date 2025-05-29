import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { validationModule } from './validation/validation.module';
import { StoresModule } from './stores/stores.module';
import { AdminsModule } from './admins/admins.module';
import { DevicesModule } from './devices/devices.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [validationModule, AuthModule, StoresModule, AdminsModule, DevicesModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
