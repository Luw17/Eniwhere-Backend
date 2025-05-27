import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Store } from './store.entity';

@Entity('2fcode_store')
@Unique(['code'])
export class TwoFCodeStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  code: string;

  @Column({ type: 'datetime' })
  validity: Date;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
