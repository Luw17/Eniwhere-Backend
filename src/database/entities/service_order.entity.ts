import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserDevice } from './user_has_device.entity';
import { StoreWorker } from './worker.entity';
import { OrderLog } from './order_log.entity';
import { Picture } from './picture.entity';

@Entity('service_orders')
export class ServiceOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserDevice, userDevice => userDevice.serviceOrders, { eager: true })
  @JoinColumn({ name: 'user_device_id' })
  userDevice: UserDevice;

  @ManyToOne(() => StoreWorker, worker => worker.serviceOrders, { eager: true })
  @JoinColumn({ name: 'worker_id' })
  worker: StoreWorker;

  @Column('datetime')
  created_at: Date;

  @Column('datetime')
  completed_at: Date;

  @Column('int')
  feedback: number;

  @Column('int')
  warranty: number;

  @Column('text', { nullable: true })
  cost?: string;

  @Column('text', { nullable: true })
  work?: string;

  @Column('text', { nullable: true })
  status?: string;

  @Column('date', { nullable: true })
  deadline?: string;

  @Column('text', { nullable: true })
  problem?: string;

  @OneToMany(() => OrderLog, orderLog => orderLog.serviceOrder)
  orderLogs: OrderLog[];

  @OneToMany(() => Picture, picture => picture.serviceOrder)
  pictures: Picture[];
}
