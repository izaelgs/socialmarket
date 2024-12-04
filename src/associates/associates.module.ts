import { Module, forwardRef } from "@nestjs/common";
import { AssociatesService } from "./associates.service";
import { AssociatesController } from "./associates.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Associate } from "./entities/associate.entity";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Associate]),
    forwardRef(() => UserModule),
  ],
  controllers: [AssociatesController],
  providers: [AssociatesService],
})
export class AssociatesModule {}
