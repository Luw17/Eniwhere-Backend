import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ServiceOrder } from './service_order.entity';

@Entity('pictures')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ServiceOrder, serviceOrder => serviceOrder.pictures, { eager: true })
  @JoinColumn({ name: 'service_order_id' })
  serviceOrder: ServiceOrder;

  @Column({ length: 255, nullable: true })
  path?: string;
}
