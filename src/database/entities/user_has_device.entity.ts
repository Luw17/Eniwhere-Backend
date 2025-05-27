import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AppUser } from './user.entity';
import { Device } from './device.entity';
import { ServiceOrder } from './service_order.entity';

@Entity('user_devices')
export class UserDevice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AppUser, user => user.userDevices, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: AppUser;

  @ManyToOne(() => Device, device => device.userDevices, { eager: true })
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @OneToMany(() => ServiceOrder, serviceOrder => serviceOrder.userDevice)
  serviceOrders: ServiceOrder[];
}
