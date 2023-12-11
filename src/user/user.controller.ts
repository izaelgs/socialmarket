import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto copy";
import { LogInterceptor } from "src/interceptors/log.interceptor";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(LogInterceptor)
  @Post("interceptor")
  createInterceptor(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findOne(+id);
  }

  @Put(":id")
  put(@Param("id", ParseIntPipe) id: number, @Body() data: UpdatePutUserDto) {
    return this.userService.update(+id, data);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdatePatchUserDto,
  ) {
    return this.userService.updatePartial(+id, data);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return await this.userService.remove(+id);
  }
}
