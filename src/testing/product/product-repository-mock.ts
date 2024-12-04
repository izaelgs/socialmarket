import { getRepositoryToken } from "@nestjs/typeorm";
import { Product } from "../../products/entities/product.entity";
import { ProductList } from "./product-entity-list.mock";

export const ProductRepository = {
  provide: getRepositoryToken(Product),
  useValue: {
    exist: jest.fn().mockResolvedValue(true),
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(ProductList[0]),
    find: jest.fn().mockResolvedValue(ProductList),
    findOne: jest.fn().mockResolvedValue(ProductList[0]),
    findOneBy: jest.fn().mockResolvedValue(ProductList[0]),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
