import { User } from '@prisma/client';
import { CreateUserDTO } from '../dto/create-user-dto';

export abstract class UsersRepository {
  abstract createUser(data: CreateUserDTO): Promise<User>;
}
