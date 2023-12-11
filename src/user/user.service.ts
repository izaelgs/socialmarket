import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDto } from "./dto/update-put-user.dto copy";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, email, password, birthAt }: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : "",
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({});
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt }: UpdatePutUserDto,
  ) {
    await this.exists(id);

    return await this.prisma.user.update({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : "",
      },
      where: {
        id,
      },
    });
  }

  async updatePartial(
    id: number,
    { name, email, password, birthAt }: UpdatePatchUserDto,
  ) {
    await this.exists(id);

    const data: any = {};

    if (birthAt) data.birthAt = new Date(birthAt);

    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = password;

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
    if (!(await this.findOne(id))) {
      throw new NotFoundException(
        `Não foi encontrado nenhum usuário com o id ${id}`,
      );
    }
  }
}
