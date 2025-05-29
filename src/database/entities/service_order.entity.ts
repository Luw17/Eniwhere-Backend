import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserDevice } from './user_has_device.entity';
import { StoreWorker } from './worker.entity';
import { OrderLog } from './order_log.entity';
import { Picture } from './picture.entity';
import { Store } from './store.entity';

@Entity('service_orders')
export class ServiceOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserDevice, userDevice => userDevice.serviceOrders)
  @JoinColumn({ name: 'user_device_id' })
  userDevice: UserDevice;

  @ManyToOne(() => StoreWorker, worker => worker.serviceOrders)
  @JoinColumn({ name: 'worker_id' })
  worker: StoreWorker;

  @ManyToOne(() => Store, store => store.serviceOrders, { nullable: false })
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime', nullable: true })
  completed_at?: Date;

  @Column({ type: 'int', nullable: true })
  feedback?: number;

  @Column({ type: 'int', nullable: true })
  warranty?: number;

  @Column({ type: 'text', nullable: true })
  cost?: string;

  @Column({ type: 'text', nullable: true })
  work?: string;

  @Column({ type: 'text', nullable: true })
  status?: string;

  @Column({ type: 'date', nullable: true })
  deadline?: Date;

  @Column({ type: 'text', nullable: true })
  problem?: string;

  @OneToMany(() => OrderLog, log => log.serviceOrder)
  logs: OrderLog[];

  @OneToMany(() => Picture, picture => picture.serviceOrder)
  pictures: Picture[];
}
