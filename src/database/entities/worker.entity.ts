import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Store } from './store.entity';
import { ServiceOrder } from './service_order.entity';
import { Worker2FACode } from './code-worker.entity';

@Entity('store_workers')
export class StoreWorker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  user_password: string;

  @ManyToOne(() => Store, store => store.workers)
  @JoinColumn({ name: 'store_id' }) 
  store: Store;

  @OneToMany(() => ServiceOrder, so => so.worker)
  serviceOrders: ServiceOrder[];

  @OneToMany(() => Worker2FACode, code => code.worker)
  twoFactorCodes: Worker2FACode[];
}
