import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: [/\.iza\.dev\.br$/, "https://iza.dev.br"],
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Configure express to expose the raw body
  app.use(
    express.json({
      verify: (req: any, res, buf) => {
        req.rawBody = buf;
      },
    }),
  );

  await app.listen(3000);
}

bootstrap();
