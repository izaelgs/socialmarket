import { Test, TestingModule } from "@nestjs/testing";
import { PostRepository } from "../testing/post/post-repository-mock";
import { FileService } from "../file/file.service";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "../common/email/email.service";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { UserEntityRepository } from "src/testing/user/user-repository-mock";
import { UserService } from "src/user/user.service";
import { StripeService } from "../stripe/stripe.service";

describe("PostController", () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        PostService,
        EmailService,
        JwtService,
        AuthService,
        FileService,
        PostRepository,
        UserEntityRepository,
        UserService,
        {
          provide: StripeService,
          useValue: {
            createCustomer: jest
              .fn()
              .mockResolvedValue({ id: "mock_stripe_customer_id" }),
            // Add other methods as needed
          },
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
