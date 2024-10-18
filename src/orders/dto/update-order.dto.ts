import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderDto } from "./create-order.dto";
import { IsOptional, IsArray, IsNumber } from "class-validator";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  productIds?: number[];
}
