import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}
bootstrap();
