import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { Admin } from './adm.entity';

@Entity('admin_2fa_codes')
@Unique(['code'])
export class Admin2faCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  code: string;

  @Column('datetime')
  validity: Date;

  @ManyToOne(() => Admin, admin => admin.twoFaCodes, { eager: true })
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;
}
