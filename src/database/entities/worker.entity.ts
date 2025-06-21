import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { Store } from './store.entity';
import { ServiceOrder } from './service_order.entity';
import { hashPassword } from '../../utils/hash-password';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity('store_workers')
export class StoreWorker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  name: string;

  @Column({
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  username: string;

  @Column({ nullable: true, name: 'user_password' })
  userPassword: string;

  @Column({
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  email: string;

  @ManyToOne(() => Store, (store) => store.workers)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @OneToMany(() => ServiceOrder, (so) => so.worker)
  serviceOrders: ServiceOrder[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.userPassword) {
      this.userPassword = await hashPassword(this.userPassword);
    }
  }
}
