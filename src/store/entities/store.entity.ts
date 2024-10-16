import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { Associate } from "../../associates/entities/associate.entity";
import { Product } from "src/products/entities/product.entity";

@Entity("stores")
export class Store {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    length: 255,
  })
  displayName: string;

  @Column({
    length: 255,
  })
  nameLink: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;

  @Column({
    length: 20,
    unique: true,
  })
  cnpj: string;

  @Column({
    length: 255,
  })
  state: string;

  @Column({
    length: 255,
  })
  city: string;

  @Column({
    length: 255,
  })
  category: string;

  @Column({
    length: 255,
    nullable: true,
  })
  imgLink?: string;

  @Column({
    name: "creatorId",
    type: "int",
    unsigned: true,
  })
  creatorId: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => UserEntity, (user) => user.stores)
  @JoinColumn({ name: "creatorId" })
  creator: UserEntity;

  @ManyToMany(() => Associate, (associate) => associate.stores)
  @JoinTable({
    name: "store_associates",
    joinColumn: {
      name: "storeId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "associateId",
      referencedColumnName: "id",
    },
  })
  associates?: Associate[];

  @OneToMany(() => Product, (product) => product.store, {
    cascade: true,
  })
  products?: Product[];

  @Column({ type: "varchar", length: 255, nullable: true })
  stripeAccountId: string;
}
