import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { DatabaseService } from './database.service';
//todo: importar as entitys de usuarios e ordens

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // Configuração do TypeORM
    TypeOrmModule.forFeature([ ]),
  ],
  providers: [DatabaseService], // Apenas o serviço é necessário
  exports: [DatabaseService,TypeOrmModule], // Exporta apenas o serviço para outros módulos
})
export class DatabaseModule {}
