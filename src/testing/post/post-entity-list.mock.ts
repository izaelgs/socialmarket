import { Post } from "../../posts/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";

export const PostList: Post[] = [
  {
    id: 1,
    content: "This is a mock post content.",
    imageUrl: "https://example.com/image.jpg",
    createdAt: new Date("2024-02-23T01:21:29.159Z"),
    updatedAt: new Date("2024-02-23T01:21:29.159Z"),
    referencePostId: null,
    userId: 1,
    user: {
      id: 1,
      username: "mockuser",
      email: "mockuser@example.com",
      // outras propriedades do UserEntity...
    } as UserEntity,
    referencePost: null,
    comments: [],
  },
];
