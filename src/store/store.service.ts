import { ConflictException, Injectable } from "@nestjs/common";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Store } from "./entities/store.entity";
import { Not, Repository } from "typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { StripeService } from "../stripe/stripe.service";

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
    private readonly stripeService: StripeService,
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

    // Create a Stripe Connected Account
    const stripeAccountId = await this.stripeService.createConnectedAccount(
      user.email,
    );

    const store = this.storesRepository.create({
      ...createStoreDto,
      creatorId: user.id,
      stripeAccountId,
    });
    return await this.storesRepository.save(store);
  }

  async findAll() {
    return await this.storesRepository.find();
  }

  async findAllByUser(user: UserEntity) {
    return await this.storesRepository.find({
      where: {
        creatorId: user.id,
      },
    });
  }

  async findOne(id: number) {
    return await this.storesRepository.findOne({
      where: { id },
      relations: ["products"],
    });
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
