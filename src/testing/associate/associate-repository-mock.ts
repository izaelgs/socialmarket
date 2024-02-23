import { getRepositoryToken } from "@nestjs/typeorm";
import { Associate } from "../../associates/entities/associate.entity";
import { AssociateList } from "./associate-entity-list.mock";

export const AssociateEntityRepository = {
  provide: getRepositoryToken(Associate),
  useValue: {
    exist: jest.fn().mockResolvedValue(true),
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(AssociateList[0]),
    find: jest.fn().mockResolvedValue(AssociateList),
    findOneBy: jest.fn().mockResolvedValue(AssociateList[0]),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
