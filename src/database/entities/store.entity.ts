import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Address } from './address.entity';
import { StoreWorker } from './worker.entity';
import { Store2FACode } from './code-store.entity';
import { ServiceOrder } from './service_order.entity';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column({ unique: true })
  document: string;

  @Column('text')
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'user_password', unique: true })
  userPassword: string;

  @Column('int')
  number: number;

  @Column({ unique: true })
  code: string;

  @Column('datetime')
  validity: Date;

  @ManyToOne(() => Address, address => address.stores)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column('datetime' , { name: 'subscription_end' })
  subscriptionEnd: Date;

  @Column({ type: 'tinyint', default: 0 })
  analytics: boolean;

  @Column({ nullable: true })
  active: boolean;

  @OneToMany(() => StoreWorker, worker => worker.store)
  workers: StoreWorker[];

  @OneToMany(() => Store2FACode, code => code.store)
  twoFactorCodes: Store2FACode[];

  @OneToMany(() => ServiceOrder, serviceOrder => serviceOrder.store)
  serviceOrders: ServiceOrder[];
}
