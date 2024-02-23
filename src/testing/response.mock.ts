import { accessTokenServiceMock } from "./token.mock";

const statusResponseMock = {
  send: jest.fn((x) => x),
};

export const responseMock = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  status: jest.fn((x) => statusResponseMock),
  send: jest.fn((x) => x),
  cookie: jest.fn((x, y, z) => ({
    x,
    y,
    z,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    send: jest.fn((x) => accessTokenServiceMock),
  })),
  clearCookie: jest.fn((x, y, z) => ({
    x,
    y,
    z,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    send: jest.fn((x) => accessTokenServiceMock),
  })),
} as unknown as Response;
