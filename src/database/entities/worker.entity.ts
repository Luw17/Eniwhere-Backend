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

@Entity('store_workers')
export class StoreWorker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  username: string;

  @Column({ nullable: true, name: 'user_password' })
  userPassword: string;

  @Column()
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
