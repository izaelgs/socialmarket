import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { StripeService } from "./stripe.service";
import { StripeController } from "./stripe.controller";
import { AuthModule } from "../auth/auth.module";
import { EstablishmentModule } from "src/models/establishment/establishment.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => EstablishmentModule),
    ConfigModule,
  ],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
