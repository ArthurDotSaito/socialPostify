import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from './repository/users.repository';
import { CreateUserDTO } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser({ name, email, password, avatar }: CreateUserDTO) {
    const userExist = await this.usersRepository.findUserByEmail(email);
    if (userExist)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const hashPassword = bcrypt.hashSync(password, 10);

    return await this.usersRepository.createUser({
      name,
      email,
      password: hashPassword,
      avatar,
    });
  }

  async findUserById(id: string) {
    const user = await this.usersRepository.findUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
