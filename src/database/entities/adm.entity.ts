import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { hashPassword } from '../../utils/hash-password';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  username: string;

  @Column('text', { unique: true, name: 'user_password' })
  userPassword: string;

  @Column({
    type: 'text',
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  email: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.userPassword) {
      this.userPassword = await hashPassword(this.userPassword);
    }
  }
}
