import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Response,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthService } from "./auth.service";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { UserService } from "../user/user.service";
import { FileService } from "../file/file.service";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly fileService: FileService,
  ) {}

  @Post("login")
  async login(@Body() { email, password }: AuthLoginDTO, @Response() res) {
    return await this.authService.login(email, password, res);
  }

  @Get("logout")
  async logout(@Response() res) {
    return await this.authService.logout(res);
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
