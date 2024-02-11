import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto copy";
import * as bcrypt from "bcrypt";
import slugify from "slugify";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FileService } from "../file/file.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly fileService: FileService,
  ) {}

  async create(data: CreateUserDto) {
    if (await this.usersRepository.exist({ where: { email: data.email } }))
      throw new BadRequestException("Email already registered.");

    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    data.username = slugify(data.name, { lower: true });

    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({});
  }

  async findOne(id: number) {
    await this.exists(id);

    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDto,
  ) {
    await this.exists(id);

    password = await bcrypt.hash(password, await bcrypt.genSalt());

    await this.usersRepository.update(id, {
      name,
      email,
      password,
      role,
      birthAt: birthAt ? new Date(birthAt) : "",
    });

    return this.findOne(id);
  }

  async updatePartial(
    id: number,
    {
      name,
      email,
      password,
      birthAt,
      username,
      about,
      photo,
      cover_photo,
      role,
    }: UpdatePatchUserDto,
  ) {
    await this.exists(id);

    const data: any = {};

    if (birthAt) data.birthAt = new Date(birthAt);

    if (name) data.name = name;
    if (email) data.email = email;
    if (username) data.username = username;
    if (about) data.about = about;

    if (photo && typeof photo !== "string") {
      this.deleteUserAvatar(id);
      const photoResponse = await this.fileService.upload(
        photo[0],
        `profile-avatars/${id}`,
      );
      data.photo = photoResponse.Location;
    }

    if (cover_photo && typeof cover_photo !== "string") {
      this.deleteCoverPhoto(id);
      const photoResponse = await this.fileService.upload(
        cover_photo[0],
        `profile-covers/${id}`,
      );
      data.cover_photo = photoResponse.Location;
    }

    if (password)
      data.password = await bcrypt.hash(password, await bcrypt.genSalt());

    if (role) data.role = role;

    await this.usersRepository.update(id, data);

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.exists(id);

    await this.usersRepository.delete({ id });

    return true;
  }

  async exists(id: number) {
    if (
      !(await this.usersRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(
        `Não foi encontrado nenhum usuário com o id ${id}`,
      );
    }
  }

  async deleteUserAvatar(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (user.photo) {
      const photo = user.photo.split("/");
      await this.fileService.s3_delete(photo[photo.length - 1]);
    }
  }

  async deleteCoverPhoto(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (user.cover_photo) {
      const photo = user.cover_photo.split("/");
      await this.fileService.s3_delete(photo[photo.length - 1]);
    }
  }
}
