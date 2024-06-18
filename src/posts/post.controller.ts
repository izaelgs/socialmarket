import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePatchPostDto } from "./dto/update-patch-post.dto";
import { UpdatePutPostDto } from "./dto/update-put-post.dto";
import { AuthGuard } from "../guards/auth.guard";
import { ParamId } from "../decorators/param-id.decorator";
import { PostService } from "./post.service";
import { User } from "src/decorators/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@UseGuards(AuthGuard)
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: "image", maxCount: 1 }]))
  create(
    @Body() createPostDto: CreatePostDto,
    @User() user: UserEntity,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File;
    },
  ) {
    console.log("files", { ...createPostDto, ...files });
    return this.postService.create({ ...createPostDto, ...files }, user);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(":id")
  findOne(@ParamId() id: number) {
    return this.postService.findOne(id);
  }

  @Put(":id")
  put(
    @ParamId() id: number,
    @Body() data: UpdatePutPostDto,
    @User() user: UserEntity,
  ) {
    return this.postService.update(+id, data, user);
  }

  @Patch(":id")
  update(
    @ParamId() id: number,
    @Body() data: UpdatePatchPostDto,
    @User() user: UserEntity,
  ) {
    return this.postService.updatePartial(+id, data, user);
  }

  @Delete(":id")
  async remove(@ParamId() id: number, @User() user: UserEntity) {
    return await this.postService.remove(+id, user);
  }
}
