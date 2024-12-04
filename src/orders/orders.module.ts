import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { StripeModule } from "../stripe/stripe.module";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrderPaymentService } from "./order-payment.service";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";
import { Product } from "src/products/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => StripeModule),
    TypeOrmModule.forFeature([Order, Product, UserEntity]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderPaymentService],
  exports: [OrdersService],
})
export class OrdersModule {}
