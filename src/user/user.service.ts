import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto copy";
import * as bcrypt from "bcrypt";
import slugify from "slugify";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
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

    return await this.usersRepository.update(id, {
      name,
      email,
      password,
      role,
      birthAt: birthAt ? new Date(birthAt) : "",
    });
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
    if (photo) data.photo = photo;
    if (cover_photo) data.cover_photo = cover_photo;

    if (password)
      data.password = await bcrypt.hash(password, await bcrypt.genSalt());

    if (role) data.role = role;

    return await this.usersRepository.update(id, data);
  }

  async remove(id: number) {
    await this.exists(id);

    return this.usersRepository.delete({ id });
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
}
