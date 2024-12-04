import { Module, NestModule, forwardRef } from "@nestjs/common";
import { EstablishmentService } from "./establishment.service";
import { EstablishmentController } from "./establishment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Establishment } from "./entities/establishment.entity";
import { FileModule } from "../../common/file/file.module";
import { StripeModule } from "../../services/stripe/stripe.module";
import { AuthModule } from "src/services/auth/auth.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    FileModule,
    TypeOrmModule.forFeature([Establishment]),
    StripeModule,
  ],
  controllers: [EstablishmentController],
  providers: [EstablishmentService],
  exports: [EstablishmentService],
})
export class EstablishmentModule implements NestModule {
  configure() {}
}
