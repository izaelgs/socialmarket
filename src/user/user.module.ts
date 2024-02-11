import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { AuthModule } from "../auth/auth.module";
import { FileModule } from "../file/file.module";
import { UserIdCheckMiddleware } from "../middlewares/user-id-check.middleware";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    FileModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: "user/:id",
      method: RequestMethod.ALL,
    });
  }
}
