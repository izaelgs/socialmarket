import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    request.user = undefined;

    const { access_token } = request.cookies;
    if (!access_token) {
      throw new UnauthorizedException("Access token is missing");
    }

    const data = this.authService.checkToken(access_token);
    if (!data || !data.id) {
      throw new UnauthorizedException("Invalid token");
    }

    const user = await this.userService.findOne(data.id);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    request.user = user;
    return true;
  }
}
