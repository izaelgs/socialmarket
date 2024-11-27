import { Test, TestingModule } from "@nestjs/testing";
import { StoreController } from "./store.controller";
import { StoreService } from "./store.service";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";
import { UserEntityRepository } from "src/testing/user/user-repository-mock";
import { UserService } from "src/user/user.service";
import { EmailService } from "src/common/email/email.service";
import { FileService } from "src/file/file.service";
import { Store } from "./entities/store.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { OrdersService } from "src/orders/orders.service";
import { StripeService } from "src/stripe/stripe.service";

describe("StoreController", () => {
  let controller: StoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [
        StoreService,
        EmailService,
        JwtService,
        AuthService,
        FileService,
        UserEntityRepository,
        UserService,
        StripeService,
        {
          provide: getRepositoryToken(Store),
          useValue: {
            // Add mock methods as needed
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            // ... other repository methods
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              // Mock implementation of ConfigService
              if (key === "STRIPE_SECRET_KEY") return "mock_stripe_key";
              // Add other configuration keys as needed
              return null;
            }),
          },
        },
        {
          provide: OrdersService,
          useValue: {
            // Add mock methods here if needed
          },
        },
      ],
    }).compile();

    controller = module.get<StoreController>(StoreController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  // Add more tests here
});
