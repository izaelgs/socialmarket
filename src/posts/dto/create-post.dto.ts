import { IsInt, IsOptional, IsString, IsUrl } from "class-validator";
import { Type } from "class-transformer";

export class CreatePostDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  image?: Express.Multer.File;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  referencePostId?: number;
}
