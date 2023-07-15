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
    const hashPassword = bcrypt.hashSync(password);

    return await this.usersRepository.createUser({
      name,
      email,
      password: hashPassword,
      avatar,
    });
  }
}
