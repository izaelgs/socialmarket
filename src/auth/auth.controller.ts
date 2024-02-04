/* eslint-disable prettier/prettier */
import { Body, Controller, Patch, Post, Response, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "src/file/file.service";

@Controller("auth")
export class AuthController {

  constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly fileService: FileService) { }

  @Post("login")
  async login(@Body() { email, password }: AuthLoginDTO, @Response() res) {
    return await this.authService.login(email, password, res);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO, @Response() res) {
    return await this.authService.register(body, res);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO, @Response() res) {
    this.authService.reset(password, token, res);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    return { ...user, password: undefined, id: undefined };
  }

  @UseGuards(AuthGuard)
  @Patch()
  @UseInterceptors(FileInterceptor('photo'))
  update(@User() user, @UploadedFile() photo, @Body() data: any) {
    return this.userService.updatePartial(user.id, {...data, photo});
  }
}
