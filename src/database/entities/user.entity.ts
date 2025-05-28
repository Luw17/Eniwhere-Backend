import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Address } from './address.entity';
import { UserDevice } from './user_has_device.entity';
import { User2FACode } from './code-user.entity';

@Entity('app_users')
export class AppUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  document: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  userPassword: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  code: string;

  @Column({ type: 'datetime', nullable: true })
  validity: Date;

  @ManyToOne(() => Address, address => address.users)
  address: Address;

  @OneToMany(() => UserDevice, ud => ud.user)
  userDevices: UserDevice[];

  @OneToMany(() => User2FACode, code => code.user)
  twoFactorCodes: User2FACode[];
}
