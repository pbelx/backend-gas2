import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];
}
