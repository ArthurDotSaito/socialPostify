export abstract class UsersRepository {
  abstract createUser(data: CreateUserDTO): Promise<User>;
}
