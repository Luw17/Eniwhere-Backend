import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '108.167.151.51',
  port: 3306,
  username: 'progro40_ftc_user',
  password: '7v0XPYE£N6957KO0`6<@U',
  database: 'progro40_ftc_3s_bd_25',
  entities: [],
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
};
