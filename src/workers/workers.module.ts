import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreWorker } from 'src/database/entities/worker.entity';
import { WorkerRepository } from 'src/database/repositories/worker.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StoreWorker])],
  providers: [WorkersService, WorkerRepository],
  controllers: [WorkersController],
  exports: [WorkersService],
  
})
export class WorkersModule {}
