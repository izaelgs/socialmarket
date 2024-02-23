import { Test, TestingModule } from "@nestjs/testing";
import { AssociatesService } from "./associates.service";
import { Associate } from "./entities/associate.entity";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AssociateEntityRepository } from "../testing/associate/associate-repository-mock";
import { AssociateList } from "../testing/associate/associate-entity-list.mock";
import { updateAssociateDTO } from "../testing/associate/update-associate-dto";

describe("AssociatesService", () => {
  let service: AssociatesService;
  let associateRepository: Repository<Associate>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociatesService, AssociateEntityRepository],
    }).compile();

    service = module.get<AssociatesService>(AssociatesService);
    associateRepository = module.get(getRepositoryToken(Associate));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(associateRepository).toBeDefined();
  });

  describe("read", () => {
    it("should return an associate", async () => {
      const result = await service.findOne(1);

      expect(result).toEqual(AssociateList[0]);
    });
  });

  describe("update", () => {
    it("should update an associate", async () => {
      const result = await service.update(1, updateAssociateDTO);

      expect(result).toEqual(AssociateList[0]);
    });
  });
});
