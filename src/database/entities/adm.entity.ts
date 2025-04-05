import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CodeAdm } from './code-adm.entity';

@Entity()
export class Adm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  user: string;

  @Column('text', { unique: true })
  password: string;

  @Column('text', { unique: true })
  code: string;

  @Column('datetime')
  validity: Date;

  @OneToMany(() => CodeAdm, code => code.adm)
  codes: CodeAdm[];
}
