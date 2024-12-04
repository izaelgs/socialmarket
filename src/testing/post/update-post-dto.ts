import { UpdatePutPostDto } from "src/posts/dto/update-put-post.dto";
import { UpdatePatchPostDto } from "../../posts/dto/update-patch-post.dto";

export const updatePatchPostDTO: UpdatePatchPostDto = {
  content: "Updated content for patch",
  imageUrl: "https://example.com/new-image.jpg",
  referencePostId: 2,
};

export const updatePutPostDTO: UpdatePutPostDto = {
  content: "Updated content for put",
  imageUrl: "https://example.com/updated-image.jpg",
  referencePostId: 3,
};
