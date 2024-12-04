import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { EstablishmentService } from "src/models/establishment/establishment.service";
import { AuthService } from "src/services/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly establishmentService: EstablishmentService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    request.establishment = undefined;

    const { access_token } = request.cookies;
    if (!access_token) {
      throw new UnauthorizedException("Token de acesso ausente");
    }

    const data = this.authService.checkToken(access_token);
    if (!data || !data.id) {
      throw new UnauthorizedException("Token inválido");
    }

    const establishment = await this.establishmentService.findOne(data.id);
    if (!establishment) {
      throw new UnauthorizedException("Estabelecimento não encontrado");
    }

    request.establishment = establishment;
    return true;
  }
}
