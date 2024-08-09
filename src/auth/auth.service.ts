import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Response,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { EmailService } from "../email/email.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) { }

  async createToken(user: UserEntity, issuer?: string, expiresIn?: string) {
    return {
      access_token: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: expiresIn ?? "7 days",
          subject: String(user.id),
          issuer: issuer ?? "login",
          audience: "users",
        },
      ),
    };
  }

  checkToken(token: string, issuer?: string) {
    try {
      return this.jwtService.verify(token, {
        audience: "users",
        issuer: issuer ?? "login",
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(email: string, password: string, @Response() res) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new NotFoundException("Email e/ou senha incorretos.");

    const { access_token } = await this.createToken(user);

    return res
      .cookie("access_token", access_token, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "strict",
        httpOnly: true,
      })
      .send({ user });
  }

  async logout(@Response() res) {
    return res.clearCookie("access_token").send() ? true : false;
  }

  async forget(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException("Email está incorreto.");

    const { access_token } = await this.createToken(user, "reset_password", "1 day");

    this.emailService.sendEmail(
      email,
      "Recuperação de senha",
      `Para recuperar a senha, clique no link: ${process.env.APP_URL}/reset-password/${access_token}`,
    );

    return true;
  }

  async reset(password: string, token: string) {
    const user = this.checkToken(token, "reset_password");

    password = await bcrypt.hash(password, await bcrypt.genSalt());

    await this.usersRepository.update(user.id, {
      password,
    });

    return true;
  }

  async register(data: AuthRegisterDTO, @Response() res) {
    const user = await this.userService.create(data);
    const { access_token } = await this.createToken(user);

    return res
      .cookie("access_token", access_token, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "strict",
        httpOnly: true,
      })
      .send({ user });
  }
}
