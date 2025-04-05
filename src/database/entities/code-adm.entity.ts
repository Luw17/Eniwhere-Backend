import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Adm } from './adm.entity';

@Entity()
export class CodeAdm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  code: string;

  @Column('datetime')
  validity: Date;

  @ManyToOne(() => Adm, adm => adm.codes)
  adm: Adm;
}
