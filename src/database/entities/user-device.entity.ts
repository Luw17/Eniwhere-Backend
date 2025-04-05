import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn , OneToMany  } from 'typeorm';
import { User } from './user.entity';
import { Device } from './device.entity';
import { Order } from './order.entity';

@Entity()
export class UserDevice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.devices)
  user: User;

  @ManyToOne(() => Device, device => device.userDevices)
  device: Device;

  @OneToMany(() => Order, order => order.userDevice)
  orders: Order[];
}
