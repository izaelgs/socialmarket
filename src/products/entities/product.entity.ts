import { Store } from "src/store/entities/store.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  category: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "int" })
  quantityAvailable: number;

  @Column({ type: "decimal", precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ type: "varchar", nullable: true })
  imgLink: string;

  @Column({ type: "int" })
  storeId: number;

  @ManyToOne(() => Store, (store) => store.products, { onDelete: "CASCADE" })
  @JoinColumn({ name: "storeId" })
  store: Store;

  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
