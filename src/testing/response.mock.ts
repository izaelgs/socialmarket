import { accessTokenServiceMock } from "./token.mock";

const statusResponseMock = {
  send: jest.fn((x) => x),
};

export const responseMock = {
  status: jest.fn((x) => statusResponseMock),
  send: jest.fn((x) => x),
  cookie: jest.fn((x, y, z) => ({
    x,
    y,
    z,
    send: jest.fn((x) => accessTokenServiceMock),
  })),
  clearCookie: jest.fn((x, y, z) => ({
    x,
    y,
    z,
    send: jest.fn((x) => accessTokenServiceMock),
  })),
} as unknown as Response;
