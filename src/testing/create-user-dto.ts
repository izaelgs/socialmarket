import { Role } from "../enums/role.enum";
import { CreateUserDto } from "../user/dto/create-user.dto";

export const createUserDto: CreateUserDto = {
  name: "John Doe",
  username: "john",
  email: "email@email.com",
  password: "password",
  role: Role.User,
  about: "about me",
};
