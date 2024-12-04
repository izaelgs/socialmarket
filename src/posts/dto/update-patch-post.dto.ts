import { PartialType } from "@nestjs/mapped-types";
import { UpdatePutPostDto } from "./update-put-post.dto";

export class UpdatePatchPostDto extends PartialType(UpdatePutPostDto) {}
