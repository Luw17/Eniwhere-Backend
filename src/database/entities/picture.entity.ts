import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ServiceOrder } from './service_order.entity';

@Entity('pictures')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ServiceOrder, order => order.pictures)
  @JoinColumn({ name: 'service_order_id' })  // <== aqui, nome da coluna FK no banco
  serviceOrder: ServiceOrder;

  @Column({ type: 'varchar', length: 255, nullable: true })
  path: string;
}
