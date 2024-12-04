import { Module, forwardRef } from "@nestjs/common";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { Post } from "./entities/post.entity";
import { PostService } from "./post.service";
import { UserModule } from "src/user/user.module";
import { FileModule } from "src/file/file.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Post]),
    FileModule,
    forwardRef(() => UserModule),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
