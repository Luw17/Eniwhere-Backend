import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Address } from './address.entity';
import { StoreWorker } from './worker.entity';
import { Store2FACode } from './code-store.entity';

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

  @Column({ unique: true })
  userPassword: string;

  @Column('int')
  number: number;

  @Column({ unique: true })
  code: string;

  @Column('datetime')
  validity: Date;

  @ManyToOne(() => Address, address => address.stores)
  address: Address;

  @Column('datetime')
  subscriptionEnd: Date;

  @Column({ type: 'tinyint', default: 0 })
  analytics: boolean;

  @Column({ nullable: true })
  storecol: string;

  @OneToMany(() => StoreWorker, worker => worker.store)
  workers: StoreWorker[];

  @OneToMany(() => Store2FACode, code => code.store)
  twoFactorCodes: Store2FACode[];
}
