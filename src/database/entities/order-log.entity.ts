import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.logs)
  order: Order;

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
  date: Date;
}
