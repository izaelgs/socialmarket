import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { StripeService } from "./stripe.service";
import { StripeController } from "./stripe.controller";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";
import { OrdersModule } from "src/orders/orders.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => OrdersModule),
    ConfigModule,
  ],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
