import { Module, forwardRef } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EstablishmentModule } from "./models/establishment/establishment.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { FileModule } from "./common/file/file.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailService } from "./common/email/email.service";
<<<<<<< HEAD
=======
import { AssociatesModule } from "./associates/associates.module";
import { PostModule } from "./posts/post.module";
import { StoreModule } from "./store/store.module";
import { ProductsModule } from "./products/products.module";
>>>>>>> 18e40cf9b897dd866e82c93cf7754fcd6250c8da
import * as Joi from "joi";
import { AuthModule } from "./services/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule acessível globalmente na aplicação
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        ENV: Joi.string()
          .valid("development", "production", "test")
          .default("development"),
      }),
      envFilePath: ".env", // Especifique o caminho se o .env estiver em um local diferente do padrão
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 100,
        limit: 10,
      },
    ]),
    forwardRef(() => AuthModule),
    FileModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DATABASE_HOST"),
        port: 3306,
        username: configService.get<string>("DATABASE_USER"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        database: configService.get<string>("DATABASE_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: configService.get<string>("ENV") === "development",
        logging: configService.get<string>("ENV") === "development",
      }),
    }),

    EstablishmentModule,
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
export class AppModule {}
