import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('adm')
@Unique(['user'])
@Unique(['password'])
@Unique(['code'])
export class Adm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  user: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  code: string;

  @Column({ type: 'datetime' })
  validity: Date;
}
