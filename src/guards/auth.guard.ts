/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ) {

    try {
      const request = context.switchToHttp().getRequest();

      const { access_token } = request.cookies;

      const data = this.authService.checkToken(access_token);

      const user = await this.userService.findOne(data.id);

      request.user = user;

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }

  }
}
