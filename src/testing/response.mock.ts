import { accessTokenServiceMock } from "./token.mock";

const statusResponseMock = {
  send: jest.fn((x) => x),
};

export const responseMock = {
  status: jest.fn(() => statusResponseMock),
  send: jest.fn((x) => x),
  cookie: jest.fn((x, y, z) => ({
    x,
    y,
    z,
    send: jest.fn(() => accessTokenServiceMock),
  })),
  clearCookie: jest.fn((x, y, z) => ({
    x,
    y,
    z,
    send: jest.fn(() => accessTokenServiceMock),
  })),
} as unknown as Response;
