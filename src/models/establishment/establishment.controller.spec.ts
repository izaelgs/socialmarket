import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./establishment.controller";
import { UserService } from "./establishment.service";
import { UserEntityRepository } from "../../testing/user/user-repository-mock";
import { FileService } from "../../common/file/file.service";
import { AuthService } from "../../auth/auth.service";
import { JwtService } from "@nestjs/jwt";
<<<<<<< HEAD:src/models/establishment/establishment.controller.spec.ts
import { EmailService } from "../../common/email/email.service";
import { StripeService } from "src/services/stripe/stripe.service";
import { UserEntity } from "./entities/establishment.entity";
=======
import { EmailService } from "../common/email/email.service";
import { StripeService } from "src/stripe/stripe.service";
import { UserEntity } from "./entities/user.entity";
>>>>>>> 18e40cf9b897dd866e82c93cf7754fcd6250c8da:src/user/user.controller.spec.ts
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
