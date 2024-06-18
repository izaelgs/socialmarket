/* eslint-disable prettier/prettier */
import { Module, forwardRef } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { FileModule } from "./file/file.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailService } from './email/email.service';
import { AssociatesModule } from './associates/associates.module';
import { PostModule } from "./posts/post.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 100,
        limit: 10,
      },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    FileModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.ENV === 'development',
    }),
    AssociatesModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    EmailService,
  ],
})
export class AppModule { }
