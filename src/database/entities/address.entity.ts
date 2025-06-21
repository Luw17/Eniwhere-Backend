import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AppUser } from './user.entity';
import { Store } from './store.entity';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    name: 'postal_code',
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  postalCode: string;

  @Column({
    type: 'text',
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  country: string;

  @Column({
    type: 'text',
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  state: string;

  @Column({
    type: 'text',
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  city: string;

  @Column({
    type: 'text',
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  neighborhood: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'address_line',
    transformer: new EncryptionTransformer({
      key: process.env.CRYPTO_SECRET,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
    }),
  })
  addressLine: string;

  @OneToMany(() => AppUser, (user) => user.address)
  users: AppUser[];

  @OneToMany(() => Store, (store) => store.address)
  stores: Store[];
}
