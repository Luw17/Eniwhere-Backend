import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { AppUser } from './user.entity';

@Entity('user_2fa_codes')
@Unique(['code'])
export class User2faCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  code: string;

  @Column('datetime')
  validity: Date;

  @ManyToOne(() => AppUser, user => user.user2faCodes, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: AppUser;
}
