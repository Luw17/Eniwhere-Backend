import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { DatabaseService } from './database.service';
import { usuarios } from './entities/users.entity';
import { Ordens } from './entities/ordens.entity';
import { UsuariosRepository } from './repositories/usuarios.repository';
import { OrdensRepository } from './repositories/ordens.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // Configuração do TypeORM
    TypeOrmModule.forFeature([ usuarios, Ordens]),
  ],
  providers: [DatabaseService], // Apenas o serviço é necessário
  exports: [DatabaseService,TypeOrmModule], // Exporta apenas o serviço para outros módulos
})
export class DatabaseModule {}
