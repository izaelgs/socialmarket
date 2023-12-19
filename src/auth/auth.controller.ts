/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { UpdatePatchUserDto } from "src/user/dto/update-patch-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { FileService } from "src/file/file.service";

@Controller("auth")
export class AuthController {

  constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly fileService: FileService) { }

  @Post("login")
  async login(@Body() { email, password }: AuthLoginDTO) {
    return await this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return await this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    return { ...user, password: undefined, id: undefined };
  }

  @UseGuards(AuthGuard)
  @Patch()
  update(@User() user, @Body() data: UpdatePatchUserDto) {
    return this.userService.updatePartial(user.id, data);
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(@User() user, @UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'image/*' }),
      new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 })
    ]
  })) photo: Express.Multer.File) {

    try {
      const path = join(__dirname, "..", "..", "storage", "avatars", `photo-${user.id}.jpeg`);

      await this.fileService.upload(photo, path);

      return { success: true };
    } catch (error) {
      throw new BadRequestException(error.message);
    }

  }
}
