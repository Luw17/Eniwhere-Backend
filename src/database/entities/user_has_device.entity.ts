import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AppUser } from './user.entity';
import { Device } from './device.entity';
import { ServiceOrder } from './service_order.entity';

@Entity('user_devices')
export class UserDevice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AppUser, user => user.userDevices)
  @JoinColumn({ name: 'user_id' })
  user: AppUser;

  @ManyToOne(() => Device, device => device.userDevices)
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @OneToMany(() => ServiceOrder, so => so.userDevice)
  serviceOrders: ServiceOrder[];
}
