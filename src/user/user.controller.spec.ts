import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserEntityRepository } from "../testing/user/user-repository-mock";
import { FileService } from "../file/file.service";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "../email/email.service";
import { StripeService } from "src/stripe/stripe.service";
import { UserEntity } from "./entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("UserController", () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        EmailService,
        JwtService,
        AuthService,
        FileService,
        UserEntityRepository,
        {
          provide: StripeService,
          useValue: {
            createCustomer: jest
              .fn()
              .mockResolvedValue({ id: "mock_stripe_customer_id" }),
            // Add other methods as needed
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            // ... existing mock repository methods ...
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
