import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { Admin2faCode } from './code-adm.entity';

@Entity('admins')
@Unique(['username'])
@Unique(['user_password'])
@Unique(['code'])
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  username: string;

  @Column('text')
  user_password: string;

  @Column('text')
  code: string;

  @Column('datetime')
  validity: Date;

  @OneToMany(() => Admin2faCode, code => code.admin)
  twoFaCodes: Admin2faCode[];
}
