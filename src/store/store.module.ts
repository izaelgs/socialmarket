import { forwardRef, Module } from "@nestjs/common";
import { StoreService } from "./store.service";
import { StoreController } from "./store.controller";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "./entities/store.entity";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Store]),
    forwardRef(() => UserModule),
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
