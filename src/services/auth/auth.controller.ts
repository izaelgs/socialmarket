import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Response,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthService } from "./auth.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { EstablishmentService } from "src/models/establishment/establishment.service";
import { FileService } from "src/common/file/file.service";
import { AuthGuard } from "src/common/guards/auth.guard";
import { EstablishmentDecorator } from "src/common/decorators/user.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly establishmentService: EstablishmentService,
    private readonly authService: AuthService,
    private readonly fileService: FileService,
  ) {}

  @Post("login")
  async login(
    @Body()
    {
      email,
      google_oauth_key,
    }: Pick<AuthRegisterDTO, "email" | "google_oauth_key">,
    @Response() res,
  ) {
    return await this.authService.login(email, google_oauth_key, res);
  }

  @Get("logout")
  async logout(@Response() res) {
    return await this.authService.logout(res);
  }

  @Post("register")
  async register(@Body() body: AuthRegisterDTO, @Response() res) {
    return await this.authService.register(body, res);
  }

  @UseGuards(AuthGuard)
  @Post("me")
  async me(@EstablishmentDecorator() establishment) {
    return { ...establishment, google_oauth_key: undefined, id: undefined };
  }

  @UseGuards(AuthGuard)
  @Patch()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "photo", maxCount: 1 },
      { name: "cover_photo", maxCount: 1 },
    ]),
  )
  update(
    @EstablishmentDecorator() establishment,
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File[];
      cover_photo?: Express.Multer.File[];
    },
    @Body() data: any,
  ) {
    return this.establishmentService.update(establishment.id, {
      ...data,
      ...files,
    });
  }

  @UseGuards(AuthGuard)
  @Delete()
  async remove(@EstablishmentDecorator("id") id: number, @Response() res) {
    await this.establishmentService.deleteEstablishmentAvatar(+id);
    await this.establishmentService.deleteCoverPhoto(+id);
    await this.establishmentService.remove(+id);
    return await this.authService.logout(res);
  }
}
