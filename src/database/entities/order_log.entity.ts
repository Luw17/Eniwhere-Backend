import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ServiceOrder } from './service_order.entity';

@Entity('order_log')
export class OrderLog {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ManyToOne(() => ServiceOrder)
  @JoinColumn({ name: 'order_id' })
  serviceOrder: ServiceOrder;

  @Column({ type: 'float' })
  cost: number;

  @Column({ type: 'float' })
  work: number;

  @Column({ type: 'varchar', length: 45 })
  order_status: string;

  @Column({ type: 'date' })
  deadline: string;

  @Column({ type: 'varchar', length: 255 })
  problem: string;

  @Column({ type: 'datetime' })
  date: Date;
}
