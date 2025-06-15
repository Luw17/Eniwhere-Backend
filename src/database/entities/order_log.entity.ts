import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ServiceOrder } from './service_order.entity';

@Entity('order_logs')
export class OrderLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ServiceOrder, order => order.logs)
  @JoinColumn({ name: 'service_order_id' })
  serviceOrder: ServiceOrder;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  cost: number | null;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  work: number | null;

  @Column('text', { nullable: true })
  status: string | null;

  @Column('date', { nullable: true })
  deadline: Date | null;

  @Column('text', { nullable: true })
  problem: string | null;

  @Column('datetime',{name:'log_date'})
  logDate: Date;
}
