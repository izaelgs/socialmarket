import { Test, TestingModule } from "@nestjs/testing";
import { AssociatesController } from "./associates.controller";
import { AssociatesService } from "./associates.service";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { AssociateEntityRepository } from "../testing/associate/associate-repository-mock";
import { UserEntityRepository } from "../testing/user/user-repository-mock";
import { FileService } from "../file/file.service";
import { EmailService } from "../email/email.service";

describe("AssociatesController", () => {
  let controller: AssociatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociatesController],
      providers: [
        UserService,
        AssociatesService,
        JwtService,
        AuthService,
        FileService,
        EmailService,
        UserEntityRepository,
        AssociateEntityRepository,
      ],
    }).compile();

    controller = module.get<AssociatesController>(AssociatesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
