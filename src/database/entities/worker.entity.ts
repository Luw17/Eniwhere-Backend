import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Store } from './store.entity';
import { ServiceOrder } from './service_order.entity';
import { Worker2faCode } from './code-worker.entity';

@Entity('store_workers')
export class StoreWorker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, nullable: true })
  name?: string;

  @Column({ length: 45, nullable: true })
  username?: string;

  @Column({ length: 45, nullable: true })
  user_password?: string;

  @ManyToOne(() => Store, store => store.workers, { eager: true })
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @OneToMany(() => ServiceOrder, serviceOrder => serviceOrder.worker)
  serviceOrders: ServiceOrder[];

  @OneToMany(() => Worker2faCode, code => code.worker)
  twoFaCodes: Worker2faCode[];
}
