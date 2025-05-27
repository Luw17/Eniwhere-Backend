import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './service_order.entity';

@Entity('order_log')
export class OrderLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'text' })
  cost: string;

  @Column({ type: 'text' })
  work: string;

  @Column({ type: 'text' })
  status: string;

  @Column({ type: 'date' })
  deadline: string;

  @Column({ type: 'text' })
  problem: string;

  @Column({ type: 'datetime' })
  date: Date;
}
