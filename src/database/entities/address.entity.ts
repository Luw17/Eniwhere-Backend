import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('address')
@Unique(['id'])
@Unique(['postalCode'])
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'postal_code', type: 'text' })
  postalCode: string;

  @Column({ type: 'text' })
  country: string;

  @Column({ type: 'text' })
  state: string;

  @Column({ type: 'text' })
  city: string;

  @Column({ type: 'text' })
  neighborhood: string;

  @Column({ type: 'text' })
  address: string;
}
