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
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { User } from "src/decorators/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";

@Controller("orders")
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createOrderDto: CreateOrderDto, @User() user: UserEntity) {
    return this.ordersService.create(createOrderDto, user.id);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(":id")
  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  remove(@Param("id") id: string) {
    return this.ordersService.remove(+id);
  }

  @Get(":id/checkout")
  async createCheckoutSession(
    @Param("id") id: string,
    @User() user: UserEntity,
  ) {
    const sessionId = await this.ordersService.createCheckoutSession(
      +id,
      user.stripeCustomerId,
    );
    return { sessionId };
  }

  @Post(":id/process-payment")
  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  async processPayment(@Param("id") id: string) {
    await this.ordersService.processPayment(+id);
    return { success: true };
  }
}