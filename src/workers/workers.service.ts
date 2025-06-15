import { Injectable } from '@nestjs/common';
import { WorkerRepository } from '../database/repositories/worker.repository';
import { StoreWorker } from 'src/database/entities/worker.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class WorkersService {
    constructor(private readonly workerRepository: WorkerRepository) {
        
    }

    async validateWorker(username: string, userPassword: string): Promise<StoreWorker | null> {
        const worker = await this.workerRepository.findByUser(username);
        if (!worker) return null;

        const isPasswordValid = await bcrypt.compare(userPassword, worker.userPassword);
        if (!isPasswordValid) return null;

        return worker;
    }
}
