import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { EmailService } from "src/common/email/email.service";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";
import { FileService } from "src/file/file.service";
import { ProductRepository } from "src/testing/product/product-repository-mock";
import { UserEntityRepository } from "src/testing/user/user-repository-mock";
import { UserService } from "src/user/user.service";
import { StripeService } from "src/stripe/stripe.service";

describe("ProductsController", () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        EmailService,
        JwtService,
        AuthService,
        FileService,
        ProductRepository,
        UserEntityRepository,
        UserService,
        {
          provide: StripeService,
          useValue: {
            // Add mock methods if needed
            // For example:
            createCustomer: jest.fn(),
            createCharge: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
