import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserEntityRepository } from "../testing/user-repository-mock";
import { FileService } from "../file/file.service";

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, FileService, UserEntityRepository],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
