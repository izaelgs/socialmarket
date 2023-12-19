/* eslint-disable prettier/prettier */
import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator copy";
import { UpdatePatchUserDto } from "src/user/dto/update-patch-user.dto";

@Controller("auth")
export class AuthController {

  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() {email, password}: AuthLoginDTO) {
    return await this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return await this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() {email}: AuthForgetDTO) {
    this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() {password, token}: AuthResetDTO) {
    this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Patch()
  update(@User() user, @Body() data: UpdatePatchUserDto) {
    return this.userService.updatePartial(user.id, data);
  }
}
