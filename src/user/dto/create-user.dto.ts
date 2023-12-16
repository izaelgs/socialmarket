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

// export class CreateUserDto {
//   @IsString()
//   name: string;

//   @IsOptional()
//   @IsEnum(Role)
//   role?: number;
//   username?: string;

//   @IsEmail()
//   email: string;

//   @IsStrongPassword()
//   password: string;

//   @IsOptional()
//   @IsDateString()
//   birthAt: string;
// }

export class CreateUserDto {
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

  @IsString()
  photo: string;

  @IsString()
  cover_photo: string;

  @IsOptional()
  @IsEnum(Role)
  role?: number;
}
