import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { AppUser } from './user.entity';
import { Device } from './device.entity';
import { ServiceOrder } from './service_order.entity';

@Entity('user_devices')
export class UserDevice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AppUser, user => user.userDevices)
  user: AppUser;

  @ManyToOne(() => Device, device => device.userDevices)
  device: Device;

  @OneToMany(() => ServiceOrder, so => so.userDevice)
  serviceOrders: ServiceOrder[];
}
