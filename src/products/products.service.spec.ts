import { Test, TestingModule } from "@nestjs/testing";
import { ProductsService } from "./products.service";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { ProductRepository } from "src/testing/product/product-repository-mock";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("ProductsService", () => {
  let service: ProductsService;
  let storeRepository: Repository<Product>;
  let user: UserEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, ProductRepository],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    storeRepository = module.get(getRepositoryToken(Product));
    user = new UserEntity();
    user.id = 1;
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(storeRepository).toBeDefined();
  });
});
