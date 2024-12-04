import { UserEntity } from "src/user/entities/user.entity";
import { Product } from "src/products/entities/product.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: "varchar", length: 50 })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @Column({ type: "int", name: "userId" })
  userId: number;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
