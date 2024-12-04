import { AuthService } from "./auth.service";
import { Test, TestingModule } from "@nestjs/testing";
import { UserEntityRepository } from "../testing/user/user-repository-mock";
import { jwtServiceMock } from "../testing/jwt-service-mock";
import { userServiceMock } from "../testing/user/user-service-mock";
import { emailServiceMock } from "../testing/mailer-service-mock copy";
import { userEntityList } from "../testing/user/user-entity-list.mock";
import { accessTokenServiceMock } from "../testing/token.mock";
import { jwtPayloadMock } from "../testing/jwt-payload.mock";
import { responseMock } from "../testing/response.mock";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserEntityRepository,
        userServiceMock,
        jwtServiceMock,
        emailServiceMock,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("token", () => {
    it("should return a token", async () => {
      const token = await service.createToken(userEntityList[0]);
      expect(token).toEqual({
        access_token: { accessToken: accessTokenServiceMock },
      });
    });

    it("should check a token", async () => {
      const token = await service.checkToken(accessTokenServiceMock);

      expect(token).toEqual(jwtPayloadMock);
    });

    it("should login", async () => {
      const result = await service.login(
        "email@email.com",
        "google_oauth_key",
        responseMock,
      );

      expect(result).toEqual(accessTokenServiceMock);
    });

    it("should logout", async () => {
      const result = await service.logout(responseMock);

      expect(result).toBeTruthy();
    });
  });
});
