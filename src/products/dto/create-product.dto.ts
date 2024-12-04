import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantityAvailable: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  imgLink?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  storeId: number;
}
