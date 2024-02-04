/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Patch, Post, Response, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { FileService } from "src/file/file.service";

@Controller("auth")
export class AuthController {

  constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly fileService: FileService) { }

  @Post("login")
  async login(@Body() { email, password }: AuthLoginDTO, @Response() res) {
    return await this.authService.login(email, password, res);
  }

  @Post("logout")
  async logout(@Response() res) {
    return await this.authService.logout(res);
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
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'photo', maxCount: 1 },
    { name: 'cover_photo', maxCount: 1 },
  ]))
  update(
    @User() user,
    @UploadedFiles() files: { photo?: Express.Multer.File[], cover_photo?: Express.Multer.File[] },
    @Body() data: any
  ) {
    return this.userService.updatePartial(user.id, { ...data, ...files});
  }

  @UseGuards(AuthGuard)
  @Delete()
  async remove(@User('id') id: number, @Response() res) {
    await this.userService.deleteUserAvatar(+id);
    await this.userService.deleteCoverPhoto(+id);
    await this.userService.remove(+id);
    return await this.authService.logout(res);
  }
}
