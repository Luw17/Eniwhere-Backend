import { EntityRepository, Repository } from 'typeorm';
import { Ordens } from '../entities/ordens.entity';

@EntityRepository(Ordens) 
export class OrdensRepository extends Repository<Ordens> {}
