import { Role } from "../enums/role.enum";
import { UpdatePatchUserDto } from "../user/dto/update-patch-user.dto";
import { UpdatePutUserDto } from "../user/dto/update-put-user.dto copy";

export const updatePutUserDTO: UpdatePutUserDto = {
  name: "John Doe",
  username: "john",
  email: "email@email.com",
  password: "$2y$10$Gjm.pU0gZHua6Be5bpT.Vue0XH7CvIJ7PON2dR8d5BQ3Isfn2lx1y",
  role: Role.User,
  about: "about me",
};

export const updatePatchUserDTO: UpdatePatchUserDto = {
  name: "John Doe",
  username: "john",
  email: "email@email.com",
  password: "$2y$10$Gjm.pU0gZHua6Be5bpT.Vue0XH7CvIJ7PON2dR8d5BQ3Isfn2lx1y",
  role: Role.User,
  about: "about me",
};
