import { PartialType } from "@nestjs/mapped-types";
import { UpdatePutUserDto } from "./update-put-user.dto copy";

export class UpdatePatchUserDto extends PartialType(UpdatePutUserDto) {}
