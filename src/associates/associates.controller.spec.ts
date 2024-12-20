import { Test, TestingModule } from "@nestjs/testing";
import { AssociatesController } from "./associates.controller";
import { AssociatesService } from "./associates.service";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { AssociateEntityRepository } from "../testing/associate/associate-repository-mock";
import { FileService } from "../file/file.service";
import { EmailService } from "../common/email/email.service";
import { UserEntityRepository } from "src/testing/user/user-repository-mock";
import { UserService } from "src/user/user.service";
import { StripeService } from "src/stripe/stripe.service";

describe("AssociatesController", () => {
  let controller: AssociatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociatesController],
      providers: [
        AssociatesService,
        JwtService,
        AuthService,
        FileService,
        EmailService,
        AssociateEntityRepository,
        UserEntityRepository,
        UserService,
        {
          provide: StripeService,
          useValue: {
            // Add mock methods if needed
            // For example:
            // createCustomer: jest.fn(),
            // createCharge: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AssociatesController>(AssociatesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
