import { Role } from "../enums/role.enum";
import { UserEntity } from "../user/entities/user.entity";

export const userEntityList: UserEntity[] = [
  {
    name: "John Doe",
    username: "john",
    email: "email@email.com",
    password: "$2y$10$Gjm.pU0gZHua6Be5bpT.Vue0XH7CvIJ7PON2dR8d5BQ3Isfn2lx1y",
    role: Role.User,
    about: "about me",
  },
];
