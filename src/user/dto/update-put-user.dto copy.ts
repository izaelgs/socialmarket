import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { Role } from "src/enums/role.enum";

export class UpdatePutUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt: string;

  @IsString()
  about: string;

  @IsOptional()
  photo: Express.Multer.File;

  @IsOptional()
  cover_photo: Express.Multer.File;

  @IsOptional()
  @IsEnum(Role)
  role?: number;
}
