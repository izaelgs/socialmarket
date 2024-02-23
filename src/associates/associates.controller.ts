import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { AssociatesService } from "./associates.service";
import { UpdateAssociateDto } from "./dto/update-associate.dto";
import { AuthGuard } from "../guards/auth.guard";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enums/role.enum";
import { RoleGuard } from "../guards/role.guard";

@Controller("associate")
export class AssociatesController {
  constructor(private readonly associatesService: AssociatesService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.associatesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const associate = await this.associatesService.findOne(+id);

    if (!associate) throw new NotFoundException();

    return associate;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateAssociateDto: UpdateAssociateDto,
  ) {
    const associate = await this.associatesService.findOne(+id);

    if (!associate) throw new NotFoundException();

    return this.associatesService.update(+id, updateAssociateDto);
  }
}
