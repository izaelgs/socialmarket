import { Role } from "../../enums/role.enum";
import { UpdatePatchUserDto } from "../../user/dto/update-patch-user.dto";
import { UpdatePutUserDto } from "../../user/dto/update-put-user.dto copy";

export const updatePutUserDTO: UpdatePutUserDto = {
  name: "John Doe",
  email: "email@email.com",
  password: "$2b$10$TyAmHNxRGS84BWb/gbS6AuHhH7xbz85aR5wrq7dqush6Bl.ImLxPK",
  role: Role.User,
  about: "about me",
};

export const updatePatchUserDTO: UpdatePatchUserDto = {
  name: "John Doe",
  email: "email@email.com",
  password: "$2b$10$TyAmHNxRGS84BWb/gbS6AuHhH7xbz85aR5wrq7dqush6Bl.ImLxPK",
  role: Role.User,
  about: "about me",
};
