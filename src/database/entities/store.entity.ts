import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique, JoinColumn } from 'typeorm';
import { Address } from './address.entity';
import { StoreWorker } from './worker.entity';
import { Store2faCode } from './code-store.entity';

@Entity('stores')
@Unique(['document'])
@Unique(['username'])
@Unique(['user_password'])
@Unique(['code'])
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column({ length: 45 })
  document: string;

  @Column('text')
  email: string;

  @Column('text')
  username: string;

  @Column('text')
  user_password: string;

  @Column('int')
  number: number;

  @Column('text')
  code: string;

  @Column('datetime')
  validity: Date;

  @ManyToOne(() => Address, address => address.stores, { eager: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column('datetime')
  subscription_end: Date;

  @Column('tinyint', { default: 0 })
  analytics: number;

  @Column({ length: 45, nullable: true })
  storecol?: string;

  @OneToMany(() => StoreWorker, worker => worker.store)
  workers: StoreWorker[];

  @OneToMany(() => Store2faCode, code => code.store)
  twoFaCodes: Store2faCode[];
}
