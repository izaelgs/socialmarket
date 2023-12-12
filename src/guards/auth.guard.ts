/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ) {

    try {
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;

      const data = this.authService.checkToken((authorization ?? '').split(' ')[1]);

      const user = await this.userService.findOne(data.id);

      request.user = user;

      return true;
    } catch (error) {
      return false;
    }

  }
}
