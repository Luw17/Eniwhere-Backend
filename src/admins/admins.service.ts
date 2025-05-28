import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminsService {
    validateAdmin(username: string, userPassword: string): Promise<number | null> {
        throw new Error('Method not implemented.');
    }
}
