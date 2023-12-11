/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      secret: "7,£Jl`{-XP2=4%g(i2_+W)z>wu>r84:H",
    }),
    UserModule,
    PrismaModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
