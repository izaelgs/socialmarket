import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { Store } from "../../store/entities/store.entity";

@Entity("associates")
export class Associate {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @Column({
    type: "int",
    default: 1,
  })
  role: number;

  @Column({
    type: "varchar",
    length: 15,
    unique: true,
    nullable: true,
  })
  cpf: string;

  @Column({
    type: "varchar",
    length: 20,
    unique: true,
    nullable: true,
  })
  cnpj: string;

  @Column({
    name: "user_id",
    type: "int",
    unsigned: true,
  })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.associates)
  @JoinColumn({ name: "user_id" })
  user?: UserEntity;

  @ManyToMany(() => Store, (store) => store.associates)
  stores?: Store[];
}
