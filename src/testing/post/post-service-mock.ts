import { AssociatesService } from "../../associates/associates.service";

export const AssociateServiceMock = {
  provide: AssociatesService,
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
