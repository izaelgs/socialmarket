import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
<<<<<<< HEAD:src/services/auth/auth.module.ts
import { EstablishmentModule } from "src/models/establishment/establishment.module";
import { FileModule } from "src/common/file/file.module";
import { EmailModule } from "src/common/email/email.module";
import { Establishment } from "src/models/establishment/entities/establishment.entity";
=======
import { FileModule } from "../file/file.module";
import { UserModule } from "../user/user.module";
import { EmailModule } from "../common/email/email.module";
import { UserEntity } from "../user/entities/user.entity";
import { GoogleStrategy } from "./google.strategy";
>>>>>>> 18e40cf9b897dd866e82c93cf7754fcd6250c8da:src/auth/auth.module.ts

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
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
