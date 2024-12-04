import { UserEntity } from "src/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    type: "text",
    nullable: true,
  })
  content?: string;

  @Column({
    type: "varchar",
    length: "255",
    nullable: true,
  })
  imageUrl?: string;

  @CreateDateColumn({
    type: "datetime",
    precision: 6,
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: "datetime",
    precision: 6,
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt?: Date;

  @Column({
    type: "int",
    unsigned: true,
    nullable: true,
  })
  referencePostId?: number;

  @Column({
    type: "int",
    unsigned: true,
  })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    onDelete: "CASCADE",
    eager: true,
  })
  user: UserEntity;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: "CASCADE",
    eager: false,
  })
  referencePost?: Post;

  @OneToMany(() => Post, (post) => post.referencePost, {
    onDelete: "CASCADE",
    eager: false,
  })
  comments?: Post[];
}
