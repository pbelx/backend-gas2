import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './OrderItem';

@Entity()
export class GasCylinder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stockQuantity: number;

  @OneToMany(() => OrderItem, orderItem => orderItem.gasCylinder)
  orderItems: OrderItem[];
}
