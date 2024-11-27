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
import { AuthGuard as PassportAuthGuard } from "@nestjs/passport";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthService } from "./auth.service";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "../user/user.service";
import { FileService } from "../file/file.service";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user.decorator";
import { ConfigService } from "@nestjs/config";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  @Post("login")
  async login(@Body() { email, password }: AuthLoginDTO, @Response() res) {
    return await this.authService.login(email, password, res);
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

  @Post("forgot-password")
  async forget(@Body() { email }: AuthForgetDTO) {
    this.authService.forget(email);
  }

  @Post("reset-password")
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post("me")
  async me(@User() user) {
    return { ...user, password: undefined, id: undefined };
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
    @User() user,
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File[];
      cover_photo?: Express.Multer.File[];
    },
    @Body() data: any,
  ) {
    return this.userService.updatePartial(user.id, { ...data, ...files });
  }

  @UseGuards(AuthGuard)
  @Delete()
  async remove(@User("id") id: number, @Response() res) {
    await this.userService.deleteUserAvatar(+id);
    await this.userService.deleteCoverPhoto(+id);
    await this.userService.remove(+id);
    return await this.authService.logout(res);
  }
}
