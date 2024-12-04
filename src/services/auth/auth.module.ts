import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EstablishmentModule } from "src/models/establishment/establishment.module";
import { FileModule } from "src/common/file/file.module";
import { EmailModule } from "src/common/email/email.module";
import { Establishment } from "src/models/establishment/entities/establishment.entity";

@Module({
  imports: [
    JwtModule.register({
      secret: String(process.env.JWT_SECRET),
    }),
    forwardRef(() => EstablishmentModule),
    FileModule,
    EmailModule,
    TypeOrmModule.forFeature([Establishment]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
