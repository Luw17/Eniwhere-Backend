import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/database/entities/adm.entity';
import { AdmRepository } from 'src/database/repositories/adm.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminsService,AdmRepository],
  exports: [AdminsService],
})
export class AdminsModule {}
