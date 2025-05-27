import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('device')
@Unique(['id'])
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  device: string;

  @Column({ type: 'text' })
  model: string;

  @Column({ type: 'text' })
  brand: string;
}
