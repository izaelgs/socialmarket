import { Test, TestingModule } from "@nestjs/testing";
import { PostEntityRepository } from "../testing/post/post-repository-mock";
import { FileService } from "../file/file.service";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "../email/email.service";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

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
        PostEntityRepository,
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
