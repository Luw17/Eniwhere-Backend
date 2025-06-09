import { Injectable } from '@nestjs/common';
import { WorkerRepository } from '../database/repositories/worker.repository';
import { StoreWorker } from 'src/database/entities/worker.entity';

@Injectable()
export class WorkersService {

    constructor(private readonly workerRepository: WorkerRepository) {
        
    }

    async validateWorker(username: string, userPassword: string): Promise<StoreWorker | null> {
        const worker = await this.workerRepository.findLogin(username, userPassword);
        if (worker) {
            return worker;
        }
        return null;
    }
}
