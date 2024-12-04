import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateAssociateDto } from "./dto/update-associate.dto";
import { Associate } from "./entities/associate.entity";

@Injectable()
export class AssociatesService {
  constructor(
    @InjectRepository(Associate)
    private readonly associatesRepository: Repository<Associate>,
  ) {}

  async findAll(): Promise<Associate[]> {
    return await this.associatesRepository.find();
  }

  async findOne(id: number): Promise<Associate> {
    return await this.associatesRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateAssociateDto: UpdateAssociateDto,
  ): Promise<Associate> {
    const associate = await this.findOne(id);
    if (!associate) {
      throw new Error(`Associate with ID ${id} not found`);
    }

    Object.assign(associate, updateAssociateDto);
    return await this.associatesRepository.save(associate);
  }
}
