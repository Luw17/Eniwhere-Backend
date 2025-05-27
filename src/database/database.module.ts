import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { DatabaseService } from './database.service';

// Entidades necessárias
import { User } from './entities/user.entity';
import { Order } from './entities/service_order.entity';
import { UserHasDevice } from './entities/user_has_device.entity';
import { OrderLog } from './entities/order_log.entity';

// Repositórios utilizados
import { UserRepository } from './repositories/user.repository';
import { ServiceOrderRepository } from './repositories/order.repository';
import { UserDeviceRepository } from './repositories/user-device.repository';
import { OrderLogRepository } from './repositories/order-log.repository';

@Module({
  imports: [
   TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([
      User,
      Order,
      UserHasDevice,
      OrderLog,
    ]),
  ],
  providers: [
    DatabaseService,
    UserRepository,
    ServiceOrderRepository,
    UserDeviceRepository,
    OrderLogRepository,
  ],
  exports: [
    DatabaseService,
  ],
})
export class DatabaseModule {}
