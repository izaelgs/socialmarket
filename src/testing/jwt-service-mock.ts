import { JwtService } from "@nestjs/jwt";
import { accessTokenServiceMock } from "./token.mock";
import { jwtPayloadMock } from "./jwt-payload.mock";

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue({
      accessToken: accessTokenServiceMock,
    }),
    verify: jest.fn().mockReturnValue(jwtPayloadMock),
  },
};
