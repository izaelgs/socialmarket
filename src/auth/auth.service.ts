/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException, Response } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import * as bcrypt from "bcrypt";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly userService: UserService
  ) { }

  async createToken(user: UserEntity) {
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

  async login(email: string, password: string, @Response() res) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      }
    })

    if (!user || !await bcrypt.compare(password, user.password))
      throw new NotFoundException('Email e/ou senha incorretos.');

    const { access_token } = await this.createToken(user);

    return res.cookie('access_token', access_token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    }).send({ user });
  }

  async forget(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      }
    })

    if (!user)
      throw new NotFoundException('Email está incorreto.');

    return true;
  }

  async reset(password: string, token: string, @Response() res) {
    //TO DO: validar o token....

    const id = 0;

    await this.usersRepository.update(id, {
      password,
    });

    const user = await this.userService.findOne(id);

    const { access_token } = await this.createToken(user);

    return res.cookie('access_token', access_token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    }).send({ user });
  }

  async register(data: AuthRegisterDTO, @Response() res) {
    const user = await this.userService.create(data);
    const { access_token } = await this.createToken(user);

    return res.cookie('access_token', access_token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    }).send({ user });
  }
}
