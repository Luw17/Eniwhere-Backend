import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { AppUser } from './user.entity';
import { Store } from './store.entity';

@Entity('addresses')
@Unique(['postal_code'])
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
  address_line: string;

  @OneToMany(() => AppUser, user => user.address)
  appUsers: AppUser[];

  @OneToMany(() => Store, store => store.address)
  stores: Store[];
}
