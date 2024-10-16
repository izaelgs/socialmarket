import { Test, TestingModule } from "@nestjs/testing";
import { StoreController } from "./store.controller";
import { StoreService } from "./store.service";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";
import { UserEntityRepository } from "src/testing/user/user-repository-mock";
import { UserService } from "src/user/user.service";
import { EmailService } from "src/email/email.service";
import { FileService } from "src/file/file.service";
import { StripeService } from "src/stripe/stripe.service";
import { Store } from "./entities/store.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

describe("StoreController", () => {
  let controller: StoreController;
  let stripeService: StripeService;

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
              // Return mock values based on the key
              if (key === "STRIPE_SECRET_KEY") return "mock_stripe_key";
              // Add other configuration keys as needed
              return null;
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<StoreController>(StoreController);
    stripeService = module.get<StripeService>(StripeService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(stripeService).toBeDefined();
  });
});
