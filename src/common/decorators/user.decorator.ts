import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from "@nestjs/common";
import { Establishment } from "src/models/establishment/entities/establishment.entity";

export const EstablishmentDecorator = createParamDecorator(
  (field: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.establishment) {
      if (field) {
        return request.establishment[field];
      }

      return request.establishment as Establishment;
    } else
      throw new NotFoundException(
        "Estavelecimento não encontrado na requisição",
      );
  },
);
