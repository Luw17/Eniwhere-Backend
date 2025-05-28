import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Admin2FACode } from './code-adm.entity';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  username: string;

  @Column('text', { unique: true })
  userPassword: string;

  @Column('text', { unique: true })
  code: string;

  @Column('datetime')
  validity: Date;

  @OneToMany(() => Admin2FACode, code => code.admin)
  twoFactorCodes: Admin2FACode[];
}
