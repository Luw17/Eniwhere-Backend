import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Address } from './address.entity';
import { Order } from './order.entity';
import { CodeStore } from './code-store.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text', { unique: true })
  user: string;

  @Column('text', { unique: true })
  password: string;

  @Column('int')
  number: number;

  @Column('text', { unique: true })
  code: string;

  @Column('datetime')
  validity: Date;

  @ManyToOne(() => Address, address => address.stores)
  address: Address;

  @OneToMany(() => Order, order => order.store)
  orders: Order[];

  @OneToMany(() => CodeStore, code => code.store)
  codes: CodeStore[];
}
