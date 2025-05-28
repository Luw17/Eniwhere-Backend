import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AppUser } from './user.entity';
import { Store } from './store.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  postalCode: string;

  @Column('text')
  country: string;

  @Column('text')
  state: string;

  @Column('text')
  city: string;

  @Column('text')
  neighborhood: string;

  @Column('text')
  addressLine: string;

  @OneToMany(() => AppUser, user => user.address)
  users: AppUser[];

  @OneToMany(() => Store, store => store.address)
  stores: Store[];
}
