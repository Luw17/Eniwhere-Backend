import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserHasDevice } from './user_has_device.entity';
import { Workers } from './worker.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserHasDevice)
  @JoinColumn({ name: 'user_has_device_id' })
  userHasDevice: UserHasDevice;

  @ManyToOne(() => Workers)
  @JoinColumn({ name: 'workers_id' })
  workers: Workers;

  @Column({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'datetime', name: 'completed_at' })
  completedAt: Date;

  @Column({ type: 'int' })
  feedback: number;

  @Column({ type: 'int' })
  warranty: number;

  @Column({ type: 'text', nullable: true })
  cost: string;

  @Column({ type: 'text', nullable: true })
  work: string;

  @Column({ type: 'text', nullable: true })
  status: string;

  @Column({ type: 'date', nullable: true })
  deadline: string;

  @Column({ type: 'text', nullable: true })
  problem: string;
}
