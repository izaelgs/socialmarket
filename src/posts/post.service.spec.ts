import { Test, TestingModule } from "@nestjs/testing";
import { PostRepository } from "../testing/post/post-repository-mock";
import { FileService } from "../file/file.service";
import { postEntityList } from "../testing/post/post-entity-list.mock";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import {
  updatePatchPostDTO,
  updatePutPostDTO,
} from "../testing/post/update-post-dto";
import { PostService } from "./post.service";
import { Post } from "./entities/user.entity";
import { CreatePostDto } from "./dto/create-post.dto";

describe("PostService", () => {
  let service: PostService;
  let postRepository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, FileService, PostRepository],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get(getRepositoryToken(Post));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(postRepository).toBeDefined();
  });

  describe("create", () => {
    it("should create a post", async () => {
      jest.spyOn(postRepository, "exist").mockResolvedValueOnce(false);

      const result = await service.create(CreatePostDto);

      expect(result).toEqual(postEntityList[0]);
    });
  });

  describe("read", () => {
    it("should return a list of posts", async () => {
      const result = await service.findAll();

      expect(result).toEqual(postEntityList);
    });

    it("should return a post", async () => {
      const result = await service.findOne(1);

      expect(result).toEqual(postEntityList[0]);
    });
  });

  describe("update", () => {
    it("should update a post", async () => {
      const result = await service.update(1, updatePutPostDTO);

      expect(result).toEqual(postEntityList[0]);
    });

    it("should update a post with partial data", async () => {
      const result = await service.updatePartial(1, updatePatchPostDTO);

      expect(result).toEqual(postEntityList[0]);
    });
  });

  describe("delete", () => {
    test("should delete a post", async () => {
      const result = await service.remove(1);

      expect(result).toEqual(true);
    });
  });
});
