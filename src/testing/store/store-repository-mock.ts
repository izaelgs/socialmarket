import { getRepositoryToken } from "@nestjs/typeorm";
import { Store } from "../../store/entities/store.entity";
import { StoreList } from "./store-entity-list.mock";

export const StoreRepository = {
  provide: getRepositoryToken(Store),
  useValue: {
    exist: jest.fn().mockResolvedValue(true),
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(StoreList[0]),
    find: jest.fn().mockResolvedValue(StoreList),
    findOne: jest.fn().mockResolvedValue(StoreList[0]),
    findOneBy: jest.fn().mockResolvedValue(StoreList[0]),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
