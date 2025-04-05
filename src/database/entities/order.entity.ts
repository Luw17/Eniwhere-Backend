import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Store } from './store.entity';
import { UserDevice } from './user-device.entity';
import { OrderLog } from './order-log.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, store => store.orders)
  store: Store;

  @ManyToOne(() => UserDevice, ud => ud.orders)
  userDevice: UserDevice;

  @Column('text')
  picture: string;

  @Column('datetime')
  created_at: Date;

  @Column('datetime')
  completed_at: Date;

  @Column('int')
  feedback: number;

  @Column('int')
  warranty: number;

  @OneToMany(() => OrderLog, log => log.order)
  logs: OrderLog[];
}
