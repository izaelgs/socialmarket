import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "../../enums/role.enum";
import { Associate } from "../../associates/entities/associate.entity";
import { Post } from "src/posts/entities/post.entity";
import { Store } from "../../store/entities/store.entity";
import { Order } from "src/orders/entities/order.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @Column({
    length: 63,
  })
  name: string;

  @Column({
    length: 127,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "date",
    nullable: true,
  })
  birthAt?: Date;

  @Column()
  username: string;

  @Column()
  about: string;

  @Column()
  photo?: string;

  @Column()
  cover_photo?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ default: Role.User })
  role: number;

  @OneToMany(() => Associate, (associate) => associate.user, {
    cascade: true,
  })
  associates?: Associate[];

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  posts?: Post[];

  @OneToMany(() => Store, (store) => store.creator, {
    cascade: true,
  })
  stores?: Store[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column({ nullable: true })
  stripeCustomerId?: string;
}
