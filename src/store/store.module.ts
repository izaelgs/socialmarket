import { forwardRef, Module } from "@nestjs/common";
import { StoreService } from "./store.service";
import { StoreController } from "./store.controller";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "./entities/store.entity";
import { UserModule } from "src/user/user.module";
import { StripeModule } from "src/stripe/stripe.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Store]),
    forwardRef(() => UserModule),
    forwardRef(() => StripeModule),
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
