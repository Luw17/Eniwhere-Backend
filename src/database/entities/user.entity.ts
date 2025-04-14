import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Address } from './address.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 45 })
  document: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 45 })
  user: string;

  @Column({ type: 'varchar', length: 45 })
  password: string;

  @Column({ type: 'smallint', nullable: true })
  number: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  code: string;

  @Column({ type: 'datetime', nullable: true })
  validity: Date;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
