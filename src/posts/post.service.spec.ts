import { Test, TestingModule } from "@nestjs/testing";
import { PostRepository } from "../testing/post/post-repository-mock";
import { FileService } from "../file/file.service";
import { PostList } from "../testing/post/post-entity-list.mock";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import {
  updatePatchPostDTO,
  updatePutPostDTO,
} from "../testing/post/update-post-dto";
import { PostService } from "./post.service";
import { Post } from "./entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { createPostDto } from "src/testing/post/create-post-dto";

describe("PostService", () => {
  let service: PostService;
  let postRepository: Repository<Post>;
  let user: UserEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, FileService, PostRepository],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get(getRepositoryToken(Post));
    user = new UserEntity();
    user.id = 1;
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(postRepository).toBeDefined();
  });

  describe("create", () => {
    it("should create a post", async () => {
      jest.spyOn(postRepository, "exist").mockResolvedValueOnce(false);

      const result = await service.create(createPostDto, user);

      expect(result).toEqual(PostList[0]);
    });
  });

  describe("read", () => {
    it("should return a list of posts", async () => {
      const result = await service.findAll();

      expect(result).toEqual(PostList);
    });

    it("should return a post", async () => {
      const result = await service.findOne(1);

      expect(result).toEqual(PostList[0]);
    });
  });

  describe("update", () => {
    it("should update a post", async () => {
      const result = await service.update(1, updatePutPostDTO, user);

      expect(result).toEqual(PostList[0]);
    });

    it("should update a post with partial data", async () => {
      const result = await service.updatePartial(1, updatePatchPostDTO, user);

      expect(result).toEqual(PostList[0]);
    });
  });

  describe("delete", () => {
    test("should delete a post", async () => {
      const result = await service.remove(1, user);

      expect(result).toEqual(true);
    });
  });
});
