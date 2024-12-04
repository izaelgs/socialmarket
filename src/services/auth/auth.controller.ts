import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Response,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
<<<<<<< HEAD:src/services/auth/auth.controller.ts
=======
import { AuthGuard as PassportAuthGuard } from "@nestjs/passport";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

import { AuthLoginDTO } from "./dto/auth-login.dto";
>>>>>>> 18e40cf9b897dd866e82c93cf7754fcd6250c8da:src/auth/auth.controller.ts
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthService } from "./auth.service";
<<<<<<< HEAD:src/services/auth/auth.controller.ts
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { EstablishmentService } from "src/models/establishment/establishment.service";
import { FileService } from "src/common/file/file.service";
import { AuthGuard } from "src/common/guards/auth.guard";
import { EstablishmentDecorator } from "src/common/decorators/user.decorator";
=======
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "../user/user.service";
import { FileService } from "../file/file.service";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user.decorator";
import { ConfigService } from "@nestjs/config";
>>>>>>> 18e40cf9b897dd866e82c93cf7754fcd6250c8da:src/auth/auth.controller.ts

@Controller("auth")
export class AuthController {
  constructor(
    private readonly establishmentService: EstablishmentService,
    private readonly authService: AuthService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  @Post("login")
  async login(
    @Body()
    {
      email,
      google_oauth_key,
    }: Pick<AuthRegisterDTO, "email" | "google_oauth_key">,
    @Response() res,
  ) {
    return await this.authService.login(email, google_oauth_key, res);
  }

  @Get("logout")
  async logout(@Response() res) {
    return await this.authService.logout(res);
  }

  @Get("google")
  @UseGuards(PassportAuthGuard("google"))
  async googleAuth(@Req() req) {
    return req.user;
  }

  @Get("google/callback")
  @UseGuards(PassportAuthGuard("google"))
  async googleAuthRedirect(@Req() req, @Response() res) {
    const { user } = req;

    const { access_token } = await this.authService.createToken(user);
    return res
      .cookie("access_token", access_token, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      })
      .redirect(this.configService.get<string>("FRONTEND_DASHBOARD_URL"));
  }

  @Post("register")
  async register(@Body() body: AuthRegisterDTO, @Response() res) {
    return await this.authService.register(body, res);
  }

  @UseGuards(AuthGuard)
  @Post("me")
  async me(@EstablishmentDecorator() establishment) {
    return { ...establishment, google_oauth_key: undefined, id: undefined };
  }

  @UseGuards(AuthGuard)
  @Patch()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "photo", maxCount: 1 },
      { name: "cover_photo", maxCount: 1 },
    ]),
  )
  update(
    @EstablishmentDecorator() establishment,
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File[];
      cover_photo?: Express.Multer.File[];
    },
    @Body() data: any,
  ) {
    return this.establishmentService.update(establishment.id, {
      ...data,
      ...files,
    });
  }

  @UseGuards(AuthGuard)
  @Delete()
  async remove(@EstablishmentDecorator("id") id: number, @Response() res) {
    await this.establishmentService.deleteEstablishmentAvatar(+id);
    await this.establishmentService.deleteCoverPhoto(+id);
    await this.establishmentService.remove(+id);
    return await this.authService.logout(res);
  }
}
