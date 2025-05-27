import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { UserDevice } from './user_has_device.entity';

@Entity('devices')
@Unique(['id'])
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  device_name: string;

  @Column('text')
  model: string;

  @Column('text')
  brand: string;

  @OneToMany(() => UserDevice, userDevice => userDevice.device)
  userDevices: UserDevice[];
}
