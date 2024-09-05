import { StoreService } from "../../store/store.service";

export const StoreServiceMock = {
  provide: StoreService,
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
