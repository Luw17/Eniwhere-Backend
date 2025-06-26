import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { hashPassword } from '../../utils/hash-password';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  username: string;

  @Column('text', { unique: true, name: 'user_password' })
  userPassword: string;

  @Column('text', { unique: true })
  email: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.userPassword) {
      this.userPassword = await hashPassword(this.userPassword);
    }
  }
}
