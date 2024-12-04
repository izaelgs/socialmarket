import { IsNotEmpty, IsNumber, IsArray } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  productIds: number[];
}
