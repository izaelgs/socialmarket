import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";
import { StripeService } from "../stripe/stripe.service";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly stripeService: StripeService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: number) {
    const newOrder = this.ordersRepository.create(createOrderDto);
    newOrder.userId = userId;
    return await this.ordersRepository.save(newOrder);
  }

  async findAll() {
    return await this.ordersRepository.find({
      relations: ["user", "products"],
    });
  }

  async findOne(id: number) {
    return await this.ordersRepository.findOne({
      where: { id },
      relations: ["user", "products"],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const orderToUpdate = await this.ordersRepository.findOne({
      where: { id },
    });
    if (!orderToUpdate) {
      throw new Error(`Order with id ${id} not found`);
    }
    const updatedOrder = Object.assign(orderToUpdate, updateOrderDto);
    return await this.ordersRepository.save(updatedOrder);
  }

  async remove(id: number) {
    const orderToRemove = await this.ordersRepository.findOne({
      where: { id },
    });
    if (!orderToRemove) {
      throw new Error(`Order with id ${id} not found`);
    }
    return await this.ordersRepository.remove(orderToRemove);
  }

  async createCheckoutSession(orderId: number, customerId: string) {
    const order = await this.findOne(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    return this.stripeService.createCheckoutSession(
      orderId,
      order.totalAmount,
      customerId,
    );
  }

  async processPayment(orderId: number) {
    const order = await this.findOne(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    // Update order status
    order.status = "paid";
    await this.ordersRepository.save(order);

    // Transfer funds to product owners
    for (const product of order.products) {
      if (!product.store.stripeAccountId) {
        throw new Error(
          `Store for product ${product.id} does not have a Stripe account`,
        );
      }
      const ownerAccountId = product.store.stripeAccountId;
      const amount = product.price;
      await this.stripeService.transferFunds(amount, ownerAccountId);
    }
  }
}
