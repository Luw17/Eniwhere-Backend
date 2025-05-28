import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ServiceOrder } from './service_order.entity';

@Entity('pictures')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ServiceOrder, order => order.pictures)
  serviceOrder: ServiceOrder;

  @Column({ type: 'varchar', length: 255, nullable: true })
  path: string;
}
