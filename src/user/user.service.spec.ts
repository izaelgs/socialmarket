import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserEntityRepository } from "../testing/user/user-repository-mock";
import { FileService } from "../file/file.service";
import { userEntityList } from "../testing/user/user-entity-list.mock";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { createUserDto } from "../testing/create-user-dto";
import {
  updatePatchUserDTO,
  updatePutUserDTO,
} from "../testing/user/update-user-dto";

describe("UserService", () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, FileService, UserEntityRepository],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe("create", () => {
    it("should create a user", async () => {
      jest.spyOn(userRepository, "exist").mockResolvedValueOnce(false);

      const result = await service.create(createUserDto);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe("read", () => {
    it("should return a list of users", async () => {
      const result = await service.findAll();

      expect(result).toEqual(userEntityList);
    });

    it("should return a user", async () => {
      const result = await service.findOne(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe("update", () => {
    it("should update a user", async () => {
      const result = await service.update(1, updatePutUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });

    it("should update a user with partial data", async () => {
      const result = await service.updatePartial(1, updatePatchUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe("delete", () => {
    test("should delete a user", async () => {
      const result = await service.remove(1);

      expect(result).toEqual(true);
    });
  });
});
