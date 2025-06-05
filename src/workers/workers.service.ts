import { Injectable } from '@nestjs/common';
import { WorkerRepository } from '../database/repositories/worker.repository';

@Injectable()
export class WorkersService {

    constructor(private readonly workerRepository: WorkerRepository) {
        
    }

    async validateWorker(username: string, userPassword: string): Promise<number | null> {
        const worker = await this.workerRepository.findLogin(username, userPassword);
        if (worker) {
            return worker.id;
        }
        return null;
    }
}
