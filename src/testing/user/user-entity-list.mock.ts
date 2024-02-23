import { Role } from "../../enums/role.enum";
import { UserEntity } from "../../user/entities/user.entity";

export const userEntityList: UserEntity[] = [
  {
    name: "John Doe",
    username: "john",
    email: "email@email.com",
    password: "$2b$10$TyAmHNxRGS84BWb/gbS6AuHhH7xbz85aR5wrq7dqush6Bl.ImLxPK",
    role: Role.User,
    about: "about me",
  },
];
