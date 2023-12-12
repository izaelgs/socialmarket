import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDto } from "./dto/update-put-user.dto copy";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    if (data.birthAt) data.birthAt = new Date(data.birthAt).toISOString();

    return await this.prisma.user.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({});
  }

  async findOne(id: number) {
    await this.exists(id);

    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDto,
  ) {
    await this.exists(id);

    password = await bcrypt.hash(password, await bcrypt.genSalt());

    return await this.prisma.user.update({
      data: {
        name,
        email,
        password,
        role,
        birthAt: birthAt ? new Date(birthAt) : "",
      },
      where: {
        id,
      },
    });
  }

  async updatePartial(
    id: number,
    { name, email, password, birthAt, role }: UpdatePatchUserDto,
  ) {
    await this.exists(id);

    const data: any = {};

    if (birthAt) data.birthAt = new Date(birthAt);

    if (name) data.name = name;
    if (email) data.email = email;

    if (password)
      data.password = await bcrypt.hash(password, await bcrypt.genSalt());

    if (role) data.role = role;

    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
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
