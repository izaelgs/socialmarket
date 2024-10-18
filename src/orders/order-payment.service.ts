import { Injectable } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { StripeService } from "../stripe/stripe.service";

@Injectable()
export class OrderPaymentService {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly stripeService: StripeService,
  ) {}

  async createCheckoutSession(orderId: number, customerId: string) {
    const order = await this.ordersService.findOne(orderId);
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
    const order = await this.ordersService.findOne(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    // Update order status
    await this.ordersService.updateOrderStatus(orderId.toString(), "paid");

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
