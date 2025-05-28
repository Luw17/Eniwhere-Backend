import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserDevice } from './user_has_device.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  deviceName: string;

  @Column('text')
  model: string;

  @Column('text')
  brand: string;

  @OneToMany(() => UserDevice, ud => ud.device)
  userDevices: UserDevice[];
}
