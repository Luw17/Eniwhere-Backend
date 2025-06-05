import { MiddlewareConsumer, Module ,RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { validationModule } from './validation/validation.module';
import { StoresModule } from './stores/stores.module';
import { AdminsModule } from './admins/admins.module';
import { DevicesModule } from './devices/devices.module';
import { AddressModule } from './address/address.module';
import { RedisModule } from './redis/redis.module';
import { WorkersModule } from './workers/workers.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [validationModule, AuthModule, StoresModule, AdminsModule, DevicesModule, AddressModule, RedisModule, WorkersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'login', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
