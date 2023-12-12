/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService
  ) {}

  createToken(user: User) {
    return {
      access_token: this.jwtService.sign({
        id: user.id,
        name: user.name,
        email: user.email,
      }, {
        expiresIn: "7 days",
        subject: String(user.id),
        issuer: "login",
        audience: 'users',
      })
    };
  }

  checkToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        audience: 'users',
        issuer: "login",
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      }
    })

    if(!user)
      throw new NotFoundException('Email e/ou senha incorretos.');

    return this.createToken(user);
  }
  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      }
    })

    if(!user)
      throw new NotFoundException('Email está incorreto.');

    return true;
  }
  async reset(password: string, token: string) {
    //TO DO: validar o token....

    const id = 0;

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password
      }
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}