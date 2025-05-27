import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { StoreWorker } from './worker.entity';

@Entity('worker_2fa_codes')
export class Worker2faCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  code?: string;

  @Column('text', { nullable: true })
  validity?: string;

  @ManyToOne(() => StoreWorker, worker => worker.twoFaCodes, { eager: true })
  @JoinColumn({ name: 'worker_id' })
  worker: StoreWorker;
}
