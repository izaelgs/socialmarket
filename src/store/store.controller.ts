import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { StoreService } from "./store.service";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { User } from "src/decorators/user.decorator";

@Controller("store")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createStoreDto: CreateStoreDto, @User() user) {
    return this.storeService.create(createStoreDto, user);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.storeService.remove(+id);
  }
}
