import { Controller, Post, Body, Get, Param, UseGuards } from "@nestjs/common";
import { StripeService } from "./stripe.service";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("stripe")
@UseGuards(AuthGuard)
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post("create-checkout-session")
  async createCheckoutSession(
    @Body() body: { orderId: number; amount: number; customerId: string },
  ) {
    const sessionId = await this.stripeService.createCheckoutSession(
      body.orderId,
      body.amount,
      body.customerId,
    );
    return { sessionId };
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
}
