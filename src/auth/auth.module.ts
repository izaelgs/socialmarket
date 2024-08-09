import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileModule } from "../file/file.module";
import { UserModule } from "../user/user.module";
import { EmailModule } from "../email/email.module";
import { UserEntity } from "../user/entities/user.entity";

@Module({
  imports: [
    JwtModule.register({
      secret: String(process.env.JWT_SECRET),
    }),
    forwardRef(() => UserModule),
    FileModule,
    EmailModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
