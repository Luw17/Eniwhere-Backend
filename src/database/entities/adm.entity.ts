import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  username: string;

  @Column('text', { unique: true ,name: 'user_password'})
  userPassword: string;

}
