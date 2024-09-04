import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from "class-validator";

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  displayName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  nameLink: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  @Length(14, 20)
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  state: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  category: string;

  @IsOptional()
  @IsUrl()
  imgLink?: string;
}
