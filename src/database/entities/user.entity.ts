import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Address } from './address.entity';
import { UserDevice } from './user_has_device.entity';
import { hashPassword } from '../../utils/hash-password';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity('app_users')
export class AppUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  document: string;

  @Column({ nullable: true })
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column({
    nullable: true,
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  phone: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, nullable: false, name: 'user_password' })
  userPassword: string;

  @Column({ nullable: true })
  number: string;

  @ManyToOne(() => Address, (address) => address.users)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({ name: 'active', nullable: false })
  active: boolean;

  @OneToMany(() => UserDevice, (ud) => ud.user)
  userDevices: UserDevice[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.userPassword) {
      this.userPassword = await hashPassword(this.userPassword);
    }
  }
}
