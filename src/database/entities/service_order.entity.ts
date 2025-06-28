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

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', nullable: true })
  completed_at: Date | null;

  @Column({ type: 'int', nullable: true })
  feedback: number | null;

  @Column({ type: 'int', nullable: true })
  warranty: number | null;

@Column({
  type: 'decimal',
  precision: 10,
  scale: 2,
  nullable: true,
  transformer: {
    to: (value: any) => value === '' || value === undefined ? null : Number(value),
    from: (value: string) => parseFloat(value),
  },
})
cost: number | null;


  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2, 
    nullable: true,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value)
    }
  })
  work: number | null;

  @Column({ 
    type: 'varchar', 
    length: 100, 
    nullable: true, 
    default: 'pending' 
  })
  status: string | null;

  @Column({ type: 'date', nullable: true })
  deadline: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  problem: string | null;

  @OneToMany(() => OrderLog, log => log.serviceOrder)
  logs: OrderLog[];

  @OneToMany(() => Picture, picture => picture.serviceOrder)
  pictures: Picture[];
}