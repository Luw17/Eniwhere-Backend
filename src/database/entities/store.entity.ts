import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Address } from './address.entity';

@Entity('store')
@Unique(['id', 'user', 'password', 'code'])
export class Store {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 45 })
  user: string;

  @Column({ type: 'varchar', length: 45 })
  password: string;

  @Column({ type: 'smallint' })
  number: number;

  @Column({ type: 'varchar', length: 45 })
  code: string;

  @Column({ type: 'datetime' })
  validity: Date;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
