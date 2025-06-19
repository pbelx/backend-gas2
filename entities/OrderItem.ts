import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './Order';
import { GasCylinder } from './GasCylinder';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, order => order.items)
  order: Order;

  @ManyToOne(() => GasCylinder, gasCylinder => gasCylinder.orderItems)
  gasCylinder: GasCylinder;
}
