import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { usuarios } from './entities/users.entity';
import { Ordens } from './entities/ordens.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '11675800',
  database: 'eniwhere',
  driver: require('mysql2'),
  entities: [usuarios, Ordens],
  synchronize: true,
};


