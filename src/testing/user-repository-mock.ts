import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";

export const UserEntityRepository = {
  provide: getRepositoryToken(UserEntity),
  useValue: {
    exist: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
