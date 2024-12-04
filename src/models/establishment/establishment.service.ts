import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateEstablishmentDto } from "./dto/create-establishment.dto";
import { UpdateEstablishmentDto } from "./dto/update-establishment.dto";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Establishment } from "./entities/establishment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FileService } from "../../common/file/file.service";
import { StripeService } from "src/services/stripe/stripe.service";

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentsRepository: Repository<Establishment>,
    private readonly fileService: FileService,
    private readonly stripeService: StripeService,
  ) {}

  async create(data: CreateEstablishmentDto) {
    if (
      await this.establishmentsRepository.exist({
        where: { email: data.email },
      })
    )
      throw new BadRequestException("Email already registered.");

    data.google_oauth_key = await bcrypt.hash(data.google_oauth_key, 10);

    // Create a Stripe customer
    const stripeCustomer = await this.stripeService.createCustomer({
      email: data.email,
      name: data.name,
    });

    const establishment = this.establishmentsRepository.create({
      ...data,
      stripeCustomerId: stripeCustomer.id,
    });
    return await this.establishmentsRepository.save(establishment);
  }

  async findAll() {
    return await this.establishmentsRepository.find({});
  }

  async findOne(id: number) {
    await this.exists(id);

    return await this.establishmentsRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, payload: UpdateEstablishmentDto) {
    await this.exists(id);

    await this.establishmentsRepository.update(id, payload);

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.exists(id);

    await this.establishmentsRepository.delete({ id });

    return true;
  }

  async exists(id: number) {
    if (
      !(await this.establishmentsRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(
        `Não foi encontrado nenhum estabelecimento com o id ${id}`,
      );
    }
  }

  async deleteEstablishmentAvatar(id: number) {
    const establishment = await this.establishmentsRepository.findOne({
      where: { id },
    });

    if (establishment.logo_url) {
      const photo = establishment.logo_url.split("/");
      await this.fileService.s3_delete(photo[photo.length - 1]);
    }
  }

  async deleteCoverPhoto(id: number) {
    const establishment = await this.establishmentsRepository.findOne({
      where: { id },
    });

    if (establishment.banner_url) {
      const photo = establishment.banner_url.split("/");
      await this.fileService.s3_delete(photo[photo.length - 1]);
    }
  }
}
