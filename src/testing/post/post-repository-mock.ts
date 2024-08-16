import { getRepositoryToken } from "@nestjs/typeorm";
import { Post } from "../../posts/entities/post.entity";
import { PostList } from "./post-entity-list.mock";

export const PostRepository = {
  provide: getRepositoryToken(Post),
  useValue: {
    exist: jest.fn().mockResolvedValue(true),
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(PostList[0]),
    find: jest.fn().mockResolvedValue(PostList),
    findOne: jest.fn().mockResolvedValue(PostList[0]),
    findOneBy: jest.fn().mockResolvedValue(PostList[0]),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
