import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as path from 'path';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port:3307,
  username:'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mydb',

  entities: [path.join(__dirname, '..', 'database', 'entities', '*.entity.{ts,js}')],

  synchronize: false,
  logging: true,
  // factories: [path.join(__dirname, 'factories', '*.{ts,js}')], // se usar factories
};

export const AppDataSource = new DataSource(dataSourceOptions);
