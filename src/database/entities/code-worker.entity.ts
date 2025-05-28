import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { StoreWorker } from './worker.entity';

@Entity('worker_2fa_codes')
export class Worker2FACode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  code: string;

  @Column('text', { nullable: true })
  validity: string;

  @ManyToOne(() => StoreWorker, worker => worker.twoFactorCodes)
  worker: StoreWorker;
}
