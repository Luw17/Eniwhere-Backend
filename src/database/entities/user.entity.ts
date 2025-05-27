import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Address } from './address.entity';

@Entity('user')
@Unique(['document'])
@Unique(['email'])
@Unique(['user'])
@Unique(['password'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  document: string;

  @Column({ length: 45, nullable: true })
  name: string;

  @Column({ length: 45 })
  email: string;

  @Column({ length: 45, nullable: true })
  phone: string;

  @Column({ length: 45 })
  user: string;

  @Column({ length: 45 })
  password: string;

  @Column({ length: 45, nullable: true })
  number: string;

  @Column({ length: 45, nullable: true })
  code: string;

  @Column({ type: 'datetime', nullable: true })
  validity: Date;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
