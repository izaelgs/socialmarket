import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import { OrdersService } from "../orders/orders.service";

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private ordersService: OrdersService,
  ) {
    this.stripe = new Stripe(this.configService.get("STRIPE_SECRET_KEY"), {
      apiVersion: "2024-09-30.acacia", // Use the latest API version
    });
  }

  async createCustomer(customerData: {
    email: string;
    name: string;
  }): Promise<Stripe.Customer> {
    return this.stripe.customers.create({
      email: customerData.email,
      name: customerData.name,
    });
  }

  async createCheckoutSession(
    orderId: number,
    amount: number,
    customerId: string,
  ): Promise<string> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Order #${orderId}`,
            },
            unit_amount: amount * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${this.configService.get(
        "FRONTEND_URL",
      )}order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get("FRONTEND_URL")}order/cancel`,
      customer: customerId,
      metadata: { orderId: orderId.toString() },
    });

    return session.url;
  }

  async createConnectedAccount(email: string): Promise<string> {
    const account = await this.stripe.accounts.create({
      type: "express",
      email: email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    return account.id;
  }

  async createAccountLink(accountId: string): Promise<string> {
    const accountLink = await this.stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${this.configService.get("FRONTEND_URL")}/stripe/reauth`,
      return_url: `${this.configService.get("FRONTEND_URL")}/stripe/return`,
      type: "account_onboarding",
    });

    return accountLink.url;
  }

  async transferFunds(
    amount: number,
    destinationAccountId: string,
  ): Promise<void> {
    await this.stripe.transfers.create({
      amount: amount * 100, // Stripe uses cents
      currency: "usd",
      destination: destinationAccountId,
    });
  }

  async handleWebhook(body: {
    signature: string;
    rawBody: Buffer;
  }): Promise<void> {
    const signature = body.signature;
    const rawBody = body.rawBody;

    try {
      const event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        this.configService.get("STRIPE_WEBHOOK_SECRET"),
      );

      switch (event.type) {
        case "checkout.session.completed":
          await this.handleCheckoutSessionCompleted(event.data.object);
          break;
      }
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`);
    }
  }

  private async handleCheckoutSessionCompleted(
    checkoutSession: Stripe.Checkout.Session,
  ): Promise<void> {
    const orderId = checkoutSession.metadata.orderId;

    if (orderId) {
      await this.ordersService.updateOrderStatus(orderId, "paid");
    } else {
      throw new Error("No orderId found in payment intent metadata");
    }
  }
}
