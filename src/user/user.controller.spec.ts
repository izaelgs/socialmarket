import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserEntityRepository } from "../testing/user/user-repository-mock";
import { FileService } from "../file/file.service";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "../email/email.service";

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
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
