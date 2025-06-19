import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Order, order => order.driver)
  orders: Order[];
}
