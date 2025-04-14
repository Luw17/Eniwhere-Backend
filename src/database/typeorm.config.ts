import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Importar todas as entidades do seu projeto
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

// Configuração do TypeORM
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST, 
  port: parseInt(process.env.DB_PORT, 10), 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE, 
  entities: [
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
  ],
  synchronize: true, 
  autoLoadEntities: true,
  logging: true, // Habilitar o logging de consultas SQL
};
