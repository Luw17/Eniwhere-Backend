import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserDevice } from './user-device.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  device: string;

  @Column('text')
  model: string;

  @Column('text')
  mark: string;

  @OneToMany(() => UserDevice, ud => ud.device)
  userDevices: UserDevice[];
}
