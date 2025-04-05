import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Address } from './address.entity';
import { UserDevice } from './user-device.entity';
import { CodeUser } from './code-user.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  document: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  user: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  code: string;

  @Column({ type: 'datetime', nullable: true })
  validity: Date;

  @ManyToOne(() => Address, address => address.users)
  address: Address;

  @OneToMany(() => UserDevice, ud => ud.user)
  devices: UserDevice[];

  @OneToMany(() => CodeUser, code => code.user)
  codes: CodeUser[];
}
