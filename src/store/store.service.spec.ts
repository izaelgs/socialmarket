import { Test, TestingModule } from "@nestjs/testing";
import { StoreService } from "./store.service";
import { Repository } from "typeorm";
import { Store } from "./entities/store.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { StoreRepository } from "src/testing/store/store-repository-mock";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("StoreService", () => {
  let service: StoreService;
  let storeRepository: Repository<Store>;
  let user: UserEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreService, StoreRepository],
    }).compile();

    service = module.get<StoreService>(StoreService);
    storeRepository = module.get(getRepositoryToken(Store));
    user = new UserEntity();
    user.id = 1;
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
