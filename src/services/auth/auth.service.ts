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
import { Establishment } from "src/models/establishment/entities/establishment.entity";
import { EstablishmentService } from "src/models/establishment/establishment.service";
import { EmailService } from "src/common/email/email.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Establishment)
    private establishmentsRepository: Repository<Establishment>,
    private readonly establishmentService: EstablishmentService,
    private readonly emailService: EmailService,
  ) {}

  async createToken(
    establishment: Establishment,
    issuer?: string,
    expiresIn?: string,
  ) {
    return {
      access_token: this.jwtService.sign(
        {
          id: establishment.id,
          name: establishment.name,
          email: establishment.email,
        },
        {
          expiresIn: expiresIn ?? "7 days",
          subject: String(establishment.id),
          issuer: issuer ?? "login",
          audience: "establishments",
        },
      ),
    };
  }

  checkToken(token: string, issuer?: string) {
    try {
      return this.jwtService.verify(token, {
        audience: "establishments",
        issuer: issuer ?? "login",
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(email: string, google_oauth_key: string, @Response() res) {
    const establishment = await this.establishmentsRepository.findOne({
      where: {
        email,
      },
    });

    if (
      !establishment ||
      !(await bcrypt.compare(google_oauth_key, establishment.google_oauth_key))
    )
      throw new NotFoundException("Dados de autenticação incorretos.");

    const { access_token } = await this.createToken(establishment);

    return res
      .cookie("access_token", access_token, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "strict",
        httpOnly: true,
      })
      .send({ establishment });
  }

  async logout(@Response() res) {
    return res.clearCookie("access_token").send() ? true : false;
  }

  async register(data: AuthRegisterDTO, @Response() res) {
    const establishment = await this.establishmentService.create(data);
    const { access_token } = await this.createToken(establishment);

    return res
      .cookie("access_token", access_token, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "strict",
        httpOnly: true,
      })
      .send({ establishment });
  }
}
