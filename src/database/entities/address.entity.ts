import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('address')
@Unique(['id', 'postal_code'])
export class Address {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  postal_code: string;

  @Column({ type: 'varchar', length: 45 })
  country: string;

  @Column({ type: 'varchar', length: 45 })
  state: string;

  @Column({ type: 'varchar', length: 45 })
  city: string;

  @Column({ type: 'varchar', length: 45 })
  neighborhood: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;
}
