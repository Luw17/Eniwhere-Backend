import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { Store } from './store.entity';

@Entity('store_2fa_codes')
@Unique(['code'])
export class Store2faCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  code: string;

  @Column('datetime')
  validity: Date;

  @ManyToOne(() => Store, store => store.twoFaCodes, { eager: true })
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
