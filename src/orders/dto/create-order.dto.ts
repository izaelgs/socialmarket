import { IsNotEmpty, IsNumber, IsString, IsArray } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  productIds: number[];

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  totalAmount: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}
