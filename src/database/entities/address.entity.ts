import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Store } from './store.entity';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  postal_code: string;

  @Column('text')
  country: string;

  @Column('text')
  state: string;

  @Column('text')
  city: string;

  @Column('text')
  neighborhood: string;

  @Column('text')
  address: string;

  @OneToMany(() => Store, store => store.address)
  stores: Store[];

  @OneToMany(() => User, user => user.address)
  users: User[];
}
