import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto copy";

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
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Put(":id")
  put(@Param("id") id: string, @Body() updateUserDto: UpdatePutUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdatePatchUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
