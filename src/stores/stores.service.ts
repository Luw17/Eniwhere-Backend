import { Injectable } from '@nestjs/common';

@Injectable()
export class StoresService {

    validateStore(username: string, userPassword: string): Promise<number | null> {
        throw new Error('Method not implemented.');
    }
}
