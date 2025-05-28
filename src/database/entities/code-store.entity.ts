import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Store } from './store.entity';

@Entity('store_2fa_codes')
export class Store2FACode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  code: string;

  @Column('datetime')
  validity: Date;

  @ManyToOne(() => Store, store => store.twoFactorCodes)
  store: Store;
}
