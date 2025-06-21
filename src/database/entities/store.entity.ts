import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { Address } from './address.entity';
import { StoreWorker } from './worker.entity';
import { ServiceOrder } from './service_order.entity';
import { hashPassword } from '../../utils/hash-password';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column({
    unique: true,
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  document: string;

  @Column({
    type: 'text',
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'user_password', unique: true })
  userPassword: string;

  @Column('int')
  number: number;

  @ManyToOne(() => Address, (address) => address.stores)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column('datetime', { name: 'subscription_end' })
  subscriptionEnd: Date;

  @Column({ type: 'tinyint', default: 0 })
  analytics: boolean;

  @Column({ nullable: true })
  active: boolean;

  @OneToMany(() => StoreWorker, (worker) => worker.store)
  workers: StoreWorker[];

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.store)
  serviceOrders: ServiceOrder[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.userPassword) {
      this.userPassword = await hashPassword(this.userPassword);
    }
  }
}
