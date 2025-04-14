import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('device')
export class Device {
  @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 45 })
  device: string;

  @Column({ type: 'varchar', length: 45 })
  model: string;

  @Column({ type: 'varchar', length: 45 })
  brand: string;
}
