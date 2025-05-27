import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ServiceOrder } from './service_order.entity';

@Entity('order_logs')
export class OrderLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ServiceOrder, serviceOrder => serviceOrder.orderLogs, { eager: true })
  @JoinColumn({ name: 'service_order_id' })
  serviceOrder: ServiceOrder;

  @Column('text')
  cost: string;

  @Column('text')
  work: string;

  @Column('text')
  status: string;

  @Column('date')
  deadline: string;

  @Column('text')
  problem: string;

  @Column('datetime')
  log_date: Date;
}
