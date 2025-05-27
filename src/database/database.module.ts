import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { DatabaseService } from './database.service';

// Entidades necessárias
import { AppUser } from './entities/user.entity';
import { ServiceOrder } from './entities/service_order.entity';
import { UserDevice } from './entities/user_has_device.entity';
import { OrderLog } from './entities/order_log.entity';

// Repositórios utilizados
import { UserRepository } from './repositories/user.repository';
import { OrderRepository } from './repositories/order.repository';
import { UserDeviceRepository } from './repositories/user-device.repository';
import { OrderLogRepository } from './repositories/order-log.repository';

@Module({
  imports: [
   TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([
      AppUser,
      ServiceOrder,
      UserDevice,
      OrderLog,
    ]),
  ],
  providers: [
    DatabaseService,
    UserRepository,
    OrderRepository,
    UserDeviceRepository,
    OrderLogRepository,
  ],
  exports: [
    DatabaseService,
  ],
})
export class DatabaseModule {}
