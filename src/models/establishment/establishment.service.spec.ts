import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./establishment.service";
import { UserEntityRepository } from "../../testing/user/user-repository-mock";
import { FileService } from "../../common/file/file.service";
import { userEntityList } from "../../testing/user/user-entity-list.mock";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/establishment.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { createUserDto } from "../../testing/create-user-dto";
import {
  updatePatchUserDTO,
  updatePutUserDTO,
<<<<<<< HEAD:src/models/establishment/establishment.service.spec.ts
} from "../../testing/user/update-user-dto";
import { StripeService } from "../../services/stripe/stripe.service";
=======
} from "../testing/user/update-user-dto";
import { StripeService } from "../stripe/stripe.service";
import { EmailService } from "src/common/email/email.service";
>>>>>>> 18e40cf9b897dd866e82c93cf7754fcd6250c8da:src/user/user.service.spec.ts

describe("UserService", () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        EmailService,
        FileService,
        UserEntityRepository,
        {
          provide: StripeService,
          useValue: {
            createCustomer: jest
              .fn()
              .mockResolvedValue({ id: "mock_stripe_customer_id" }),
            // Add other methods as needed
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            exist: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
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
      jest.spyOn(userRepository, "create").mockReturnValue(userEntityList[0]);
      jest.spyOn(userRepository, "save").mockResolvedValue(userEntityList[0]);

      const result = await service.create(createUserDto);

      expect(result).toEqual(userEntityList[0]);
      expect(userRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        stripeCustomerId: "mock_stripe_customer_id",
      });
    });
  });

  describe("read", () => {
    it("should return a list of users", async () => {
      jest.spyOn(userRepository, "find").mockResolvedValue(userEntityList);
      const result = await service.findAll();

      expect(result).toEqual(userEntityList);
    });

    it("should return a user", async () => {
      jest.spyOn(userRepository, "exist").mockResolvedValue(true);
      jest
        .spyOn(userRepository, "findOne")
        .mockResolvedValue(userEntityList[0]);
      const result = await service.findOne(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe("update", () => {
    it("should update a user", async () => {
      jest.spyOn(userRepository, "exist").mockResolvedValue(true);
      jest
        .spyOn(userRepository, "findOne")
        .mockResolvedValue(userEntityList[0]);
      const updatedUser = { ...userEntityList[0], ...updatePutUserDTO };
      jest.spyOn(userRepository, "save").mockResolvedValue({
        ...updatedUser,
        photo:
          typeof updatedUser.photo === "string"
            ? updatedUser.photo
            : "photo.jpg",
        cover_photo:
          typeof updatedUser.cover_photo === "string"
            ? updatedUser.cover_photo
            : "cover_photo.jpg",
        birthAt: new Date(updatedUser.birthAt),
      });
      const result = await service.update(1, updatePutUserDTO);

      expect(result).toEqual(updatedUser);
    });

    it("should update a user with partial data", async () => {
      jest.spyOn(userRepository, "exist").mockResolvedValue(true);
      jest
        .spyOn(userRepository, "findOne")
        .mockResolvedValue(userEntityList[0]);
      const updatedUser = { ...userEntityList[0], ...updatePatchUserDTO };

      jest.spyOn(userRepository, "save").mockResolvedValue({
        ...updatedUser,
        photo:
          typeof updatedUser.photo === "string"
            ? updatedUser.photo
            : "photo.jpg",
        cover_photo:
          typeof updatedUser.cover_photo === "string"
            ? updatedUser.cover_photo
            : "cover_photo.jpg",
        birthAt: new Date(updatedUser.birthAt),
      });
      const result = await service.updatePartial(1, updatePatchUserDTO);

      expect(result).toEqual(updatedUser);
    });
  });

  describe("delete", () => {
    test("should delete a user", async () => {
      jest.spyOn(userRepository, "exist").mockResolvedValue(true);
      jest
        .spyOn(userRepository, "findOne")
        .mockResolvedValue(userEntityList[0]);
      jest.spyOn(userRepository, "remove").mockResolvedValue(userEntityList[0]);
      const result = await service.remove(1);

      expect(result).toEqual(true);
    });
  });
});
