import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class CodeStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  code: string;

  @Column('datetime')
  validity: Date;

  @ManyToOne(() => Store, store => store.codes)
  store: Store;
}
