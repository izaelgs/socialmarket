import { Test, TestingModule } from "@nestjs/testing";
import { StoreController } from "./store.controller";
import { StoreService } from "./store.service";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";
import { StoreRepository } from "src/testing/store/store-repository-mock";
import { UserEntityRepository } from "src/testing/user/user-repository-mock";
import { UserService } from "src/user/user.service";
import { EmailService } from "src/email/email.service";
import { FileService } from "src/file/file.service";

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
        StoreRepository,
        UserEntityRepository,
        UserService,
      ],
    }).compile();

    controller = module.get<StoreController>(StoreController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
