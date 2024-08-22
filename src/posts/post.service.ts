import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePatchPostDto } from "./dto/update-patch-post.dto";
import { UpdatePutPostDto } from "./dto/update-put-post.dto";
import { IsNull, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { Post } from "./entities/post.entity";
import { FileService } from "src/file/file.service";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly fileService: FileService,
  ) {}

  async create(data: CreatePostDto, user: UserEntity) {
    if (data.image && typeof data.image !== "string") {
      const photoResponse = await this.fileService.upload(
        data.image[0],
        `post-images/${user.id}`,
      );
      data.imageUrl = photoResponse.Location;
    }

    const post = this.postsRepository.create({ ...data, userId: user.id });
    return await this.postsRepository.save(post);
  }

  async findAll() {
    let mainPosts = await this.postsRepository.find({
      where: { referencePostId: IsNull() },
      order: { createdAt: "DESC" },
      relations: ["user", "comments"], // Relacionamentos que você deseja carregar com o post principal
    });

    mainPosts = await Promise.all(
      mainPosts.map(async (post) => {
        if (!post.comments.length) return post;

        post.comments = await this.findCommentsRecursively(post.id);
        return post;
      }),
    );

    return mainPosts;
  }

  private async findCommentsRecursively(postId: number): Promise<Post[]> {
    const comments = await this.postsRepository.find({
      where: { referencePostId: postId },
      order: { createdAt: "DESC" },
      relations: ["user"],
    });

    return await Promise.all(
      comments.map(async (comment) => {
        comment.comments = await this.findCommentsRecursively(comment.id);
        return comment;
      }),
    );
  }

  async findOne(id: number) {
    await this.exists(id);

    return await this.postsRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, data: UpdatePutPostDto, user: UserEntity) {
    const post = await this.exists(id);

    this.checkOwnership(post, user);

    await this.postsRepository.update(id, data);

    return this.findOne(id);
  }

  async updatePartial(id: number, data: UpdatePatchPostDto, user: UserEntity) {
    const post = await this.exists(id);

    this.checkOwnership(post, user);

    await this.postsRepository.update(id, data);

    return this.findOne(id);
  }

  async remove(id: number, user: UserEntity) {
    const post = await this.exists(id);

    this.checkOwnership(post, user);

    await this.postsRepository.delete({ id });

    return true;
  }

  async exists(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`No post found with the id ${id}`);
    }

    return post;
  }

  checkOwnership(post: Post, user: UserEntity) {
    if (post.userId !== user.id) {
      throw new UnauthorizedException(
        `You do not have permission to perform this action`,
      );
    }
  }
}
