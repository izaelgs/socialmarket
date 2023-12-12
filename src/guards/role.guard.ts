/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}

  async canActivate(
    context: ExecutionContext,
  ) {

    try {
      const requiredToles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

      if(!requiredToles)
        return true;

      const { user } = context.switchToHttp().getRequest();

      return requiredToles.includes(user.role);

    } catch (error) {
      return false;
    }

  }
}
