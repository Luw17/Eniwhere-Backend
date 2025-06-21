import 'reflect-metadata'; 
import { AppDataSource } from './data-source';
import { runSeeder } from 'typeorm-extension';
import { MasterSeeder } from './master.seeder';

async function run() {
  await AppDataSource.initialize();
  await runSeeder(AppDataSource, MasterSeeder);
  await AppDataSource.destroy();
}

run().catch((error) => {
  console.error('Erro ao rodar seed:', error);
  process.exit(1);
});
