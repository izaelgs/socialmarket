import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  RawBodyRequest,
} from "@nestjs/common";
import { StripeService } from "./stripe.service";
import { Request } from "express";

@Controller("stripe")
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post("create-checkout-session")
  async createCheckoutSession(
    @Body() body: { orderId: number; amount: number; customerId: string },
  ) {
    const checkoutUrl = await this.stripeService.createCheckoutSession(
      body.orderId,
      body.amount,
      body.customerId,
    );
    return { checkoutUrl };
  }

  @Post("create-connected-account")
  async createConnectedAccount(@Body() body: { email: string }) {
    const accountId = await this.stripeService.createConnectedAccount(
      body.email,
    );
    return { accountId };
  }

  @Get("account-link/:accountId")
  async getAccountLink(@Param("accountId") accountId: string) {
    const accountLinkUrl =
      await this.stripeService.createAccountLink(accountId);
    return { url: accountLinkUrl };
  }

  @Post("transfer")
  async transferFunds(
    @Body() body: { amount: number; destinationAccountId: string },
  ) {
    await this.stripeService.transferFunds(
      body.amount,
      body.destinationAccountId,
    );
    return { success: true };
  }

  @Post("webhook")
  async handleWebhook(@Req() req: RawBodyRequest<Request>) {
    const signature = req.headers["stripe-signature"] as string;

    if (!signature) {
      throw new Error("Missing stripe-signature header");
    }

    const rawBody = req.rawBody;

    if (!rawBody) {
      throw new Error("No raw body found in the request");
    }

    await this.stripeService.handleWebhook({
      rawBody,
      signature,
    });

    return { success: true };
  }
}
