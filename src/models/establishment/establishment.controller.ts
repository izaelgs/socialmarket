import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from "@nestjs/common";
import { EstablishmentService } from "./establishment.service";
import { CreateEstablishmentDto } from "./dto/create-establishment.dto";
import { UpdateEstablishmentDto } from "./dto/update-establishment.dto";

@Controller("establishment")
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Post()
  create(@Body() createEstablishmentDto: CreateEstablishmentDto) {
    return this.establishmentService.create(createEstablishmentDto);
  }

  @Get()
  findAll() {
    return this.establishmentService.findAll();
  }

  @Get(":id")
  findOne(@Param() id: number) {
    return this.establishmentService.findOne(id);
  }

  @Patch(":id")
  put(@Param() id: number, @Body() data: UpdateEstablishmentDto) {
    return this.establishmentService.update(+id, data);
  }

  @Delete(":id")
  async remove(@Param() id: number) {
    return await this.establishmentService.remove(+id);
  }
}
