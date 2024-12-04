import { Test, TestingModule } from "@nestjs/testing";
import { StoreService } from "./store.service";
import { Repository } from "typeorm";
import { Store } from "./entities/store.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { StripeService } from "src/stripe/stripe.service";

describe("StoreService", () => {
  let service: StoreService;
  let storeRepository: Repository<Store>;
  let user: UserEntity;
  let stripeService: StripeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreService,
        {
          provide: getRepositoryToken(Store),
          useValue: {
            exist: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: StripeService,
          useValue: {
            createCustomer: jest.fn(),
            // Add other methods used by StoreService
          },
        },
      ],
    }).compile();

    service = module.get<StoreService>(StoreService);
    storeRepository = module.get<Repository<Store>>(getRepositoryToken(Store));
    stripeService = module.get<StripeService>(StripeService);
    user = new UserEntity();
    user.id = 1;
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(storeRepository).toBeDefined();
    expect(stripeService).toBeDefined();
  });
});
