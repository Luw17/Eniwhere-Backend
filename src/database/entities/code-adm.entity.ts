import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Admin } from './adm.entity';

@Entity('admin_2fa_codes')
export class Admin2FACode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  code: string;

  @Column('datetime')
  validity: Date;

  @ManyToOne(() => Admin, admin => admin.twoFactorCodes)
  admin: Admin;
}
