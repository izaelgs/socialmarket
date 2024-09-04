import { ConflictException, Injectable } from "@nestjs/common";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Store } from "./entities/store.entity";
import { Not, Repository } from "typeorm";
import { UserEntity } from "src/user/entities/user.entity";

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto, user: UserEntity) {
    const existingStore = await this.storesRepository.findOne({
      where: [
        { nameLink: createStoreDto.nameLink },
        { cnpj: createStoreDto.cnpj },
      ],
    });

    if (existingStore) {
      throw new ConflictException(
        "A store with the same nameLink or cnpj already exists.",
      );
    }

    const store = this.storesRepository.create({
      ...createStoreDto,
      creatorId: user.id,
    });
    return await this.storesRepository.save(store);
  }

  async findAll() {
    return await this.storesRepository.find();
  }

  async findOne(id: number) {
    return await this.storesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const store = await this.storesRepository.findOne({ where: { id } });
    if (!store) {
      throw new Error(`Store with id ${id} not found`);
    }

    const existingStore = await this.storesRepository.findOne({
      where: [
        { nameLink: updateStoreDto.nameLink, id: Not(id) },
        { cnpj: updateStoreDto.cnpj, id: Not(id) },
      ],
    });

    if (existingStore) {
      throw new ConflictException(
        "A store with the same nameLink or cnpj already exists.",
      );
    }

    const updatedStore = Object.assign(store, updateStoreDto);
    return await this.storesRepository.save(updatedStore);
  }

  async remove(id: number) {
    const store = await this.storesRepository.findOne({ where: { id } });
    if (!store) {
      throw new Error(`Store with id ${id} not found`);
    }
    return await this.storesRepository.remove(store);
  }
}
