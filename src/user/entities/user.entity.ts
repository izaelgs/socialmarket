import { Role } from "src/enums/role.enum";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

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
  birthAt: Date;

  @Column()
  username: string;

  @Column()
  about: string;

  @Column()
  photo: string;

  @Column()
  cover_photo: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ default: Role.User })
  role: number;
}
