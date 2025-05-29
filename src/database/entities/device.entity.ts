import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserDevice } from './user_has_device.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'device_name', type: 'varchar', length: 100 })
  deviceName: string;

  @Column({ type: 'varchar', length: 100 })
  model: string;

  @Column({ type: 'varchar', length: 100 })
  brand: string;

  @Column({ name: 'active', type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => UserDevice, ud => ud.device)
  userDevices: UserDevice[];
}
