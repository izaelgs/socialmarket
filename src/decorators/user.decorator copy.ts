/* eslint-disable prettier/prettier */
import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator(
  (field: string, context: ExecutionContext) => {

    const request = context.switchToHttp().getRequest();

    if(request.user) {

      if(field) {
        return request.user[field];
      }

      return request.user;
    } else
      throw new NotFoundException("Usuário não encontrado no request");
  },
);
