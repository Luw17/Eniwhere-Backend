import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { User } from './user.entity';

@Entity('2fcode')
@Unique(['code'])
export class TwoFCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  code: string;

  @Column({ type: 'datetime' })
  validity: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
