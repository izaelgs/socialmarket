import { IsInt, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdatePutPostDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsInt()
  referencePostId?: number;
}
