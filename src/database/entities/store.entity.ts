import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Address } from './address.entity';

@Entity('store')
@Unique(['document'])
@Unique(['user'])
@Unique(['password'])
@Unique(['code'])
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ length: 45 })
  document: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  user: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'int' })
  number: number;

  @Column({ type: 'text' })
  code: string;

  @Column({ type: 'datetime' })
  validity: Date;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({ type: 'datetime', name: 'sub_end' })
  subEnd: Date;

  @Column({ type: 'tinyint', default: 0 })
  analitcs: number;

  @Column({ length: 45, nullable: true })
  storecol: string;
}
