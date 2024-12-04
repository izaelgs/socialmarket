import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("establishments")
export class Establishment {
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
  email: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;

  @Column({
    length: 255,
    nullable: true,
    name: "logo_url",
  })
  logo_url?: string;

  @Column({
    length: 255,
    nullable: true,
    name: "banner_url",
  })
  banner_url?: string;

  @Column({
    length: 255,
    nullable: true,
    name: "google_oauth_key",
  })
  google_oauth_key?: string;

  @Column({
    length: 255,
    nullable: true,
    name: "stripe_customer_id",
  })
  stripeCustomerId?: string;

  @CreateDateColumn({
    name: "createdAt",
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: "updatedAt",
  })
  updatedAt?: Date;
}
