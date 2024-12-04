import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from "@nestjs/common";
import { UserEntity } from "src/user/entities/user.entity";

export const User = createParamDecorator(
  (field: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      if (field) {
        return request.user[field];
      }

      return request.user as UserEntity;
    } else throw new NotFoundException("Usuário não encontrado no request");
  },
);
