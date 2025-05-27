import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Workers } from './worker.entity';

@Entity('2fcode_workers')
@Unique(['code'])
export class TwoFCodeWorkers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  code: string;

  @Column({ type: 'datetime' })
  validity: Date;

  @ManyToOne(() => Workers)
  @JoinColumn({ name: 'workers_id' })
  workers: Workers;
}
