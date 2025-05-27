import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique, JoinColumn } from 'typeorm';
import { Address } from './address.entity';
import { UserDevice } from './user_has_device.entity';
import { User2faCode } from './code-user.entity';

@Entity('app_users')
@Unique(['document'])
@Unique(['email'])
@Unique(['username'])
@Unique(['user_password'])
export class AppUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  document: string;

  @Column({ length: 45, nullable: true })
  name?: string;

  @Column({ length: 45 })
  email: string;

  @Column({ length: 45, nullable: true })
  phone?: string;

  @Column({ length: 45 })
  username: string;

  @Column({ length: 45 })
  user_password: string;

  @Column({ length: 45, nullable: true })
  number?: string;

  @Column({ length: 45, nullable: true })
  code?: string;

  @Column({ type: 'datetime', nullable: true })
  validity?: Date;

  @ManyToOne(() => Address, address => address.appUsers, { eager: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => UserDevice, userDevice => userDevice.user)
  userDevices: UserDevice[];

  @OneToMany(() => User2faCode, user2faCode => user2faCode.user)
  user2faCodes: User2faCode[];
}
