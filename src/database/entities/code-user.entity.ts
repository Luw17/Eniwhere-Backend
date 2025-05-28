import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AppUser } from './user.entity';

@Entity('user_2fa_codes')
export class User2FACode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  code: string;

  @Column('datetime')
  validity: Date;

  @ManyToOne(() => AppUser, user => user.twoFactorCodes)
  user: AppUser;
}
