import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { DatabaseService } from './database.service';

// Importação das entidades
import { Adm } from './entities/adm.entity';
import { CodeAdm } from './entities/code-adm.entity';
import { CodeStore } from './entities/code-store.entity';
import { CodeUser } from './entities/code-user.entity';
import { Device } from './entities/device.entity';
import { Order } from './entities/order.entity';
import { OrderLog } from './entities/order-log.entity';
import { Store } from './entities/store.entity';
import { User } from './entities/user.entity';
import { UserDevice } from './entities/user-device.entity';
import { Address } from './entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // Configuração do TypeORM
    TypeOrmModule.forFeature([
      Adm,
      CodeAdm,
      CodeStore,
      CodeUser,
      Device,
      Order,
      OrderLog,
      Store,
      User,
      UserDevice,
      Address,
    ]), // Repositórios das entidades
  ],
  providers: [DatabaseService],
  exports: [DatabaseService, TypeOrmModule], // Exporta os serviços e o módulo TypeOrmModule
})
export class DatabaseModule {}
