/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";

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
      request.user = undefined;

      const { access_token } = request.cookies;

      const data = this.authService.checkToken(access_token);

      const user = await this.userService.findOne(data.id);

      request.user = user;

      return true;
    } catch (error) {
      // console.error(error);
      return false;
    }

  }
}
