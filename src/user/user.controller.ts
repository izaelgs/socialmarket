import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto copy";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enums/role.enum";
import { AuthGuard } from "../guards/auth.guard";
import { RoleGuard } from "../guards/role.guard";
import { ParamId } from "../decorators/param-id.decorator";

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@ParamId() id: number) {
    return this.userService.findOne(id);
  }

  @Put(":id")
  put(@ParamId() id: number, @Body() data: UpdatePutUserDto) {
    return this.userService.update(+id, data);
  }

  @Patch(":id")
  update(@ParamId() id: number, @Body() data: UpdatePatchUserDto) {
    return this.userService.updatePartial(+id, data);
  }

  @Delete(":id")
  async remove(@ParamId() id: number) {
    return await this.userService.remove(+id);
  }
}
