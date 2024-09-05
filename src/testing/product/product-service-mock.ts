import { ProductsService } from "../../products/products.service";

export const ProductsServiceMock = {
  provide: ProductsService,
  useValue: {
    show: jest.fn(),
    create: jest.fn(),
    list: jest.fn(),
    update: jest.fn(),
    updatePartial: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  },
};
