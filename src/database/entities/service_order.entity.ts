import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserHasDevice } from './user_has_device.entity';
import { Worker } from './worker.entity';

@Entity('service_order')
export class ServiceOrder {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ManyToOne(() => UserHasDevice)
  @JoinColumn({ name: 'user_has_device_id' })
  userHasDevice: UserHasDevice;

  @ManyToOne(() => Worker)
  @JoinColumn({ name: 'workers_id' })
  worker: Worker;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', nullable: true })
  completed_at: Date;

  @Column({ type: 'tinyint', nullable: true })
  feedback: number;

  @Column({ type: 'smallint', nullable: true })
  warranty: number;

  @Column({ type: 'float', nullable: true })
  cost: number;

  @Column({ type: 'float', nullable: true })
  work: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  order_status: string;

  @Column({ type: 'date', nullable: true })
  deadline: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  problem: string;
}
