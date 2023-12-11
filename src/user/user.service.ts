import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDto } from "./dto/update-put-user.dto copy";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return await this.prisma.user.create({
      data,
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

  async update(id: number, data: UpdatePutUserDto) {
    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async updatePartial(id: number, data: UpdatePatchUserDto) {
    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
