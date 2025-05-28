import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ServiceOrder } from './service_order.entity';

@Entity('order_logs')
export class OrderLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ServiceOrder, order => order.logs)
  serviceOrder: ServiceOrder;

  @Column('text')
  cost: string;

  @Column('text')
  work: string;

  @Column('text')
  status: string;

  @Column('date')
  deadline: Date;

  @Column('text')
  problem: string;

  @Column('datetime')
  logDate: Date;
}
