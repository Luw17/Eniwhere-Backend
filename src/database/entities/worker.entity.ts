import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Store } from './store.entity';

@Entity('workers')
export class Workers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, nullable: true })
  name: string;

  @Column({ length: 45, nullable: true })
  user: string;

  @Column({ length: 45, nullable: true })
  password: string;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
