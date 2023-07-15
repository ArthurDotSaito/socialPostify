import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { UsersRepository } from '../users.repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDTO) {
    return await this.prisma.user.create({ data: data });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: string) {
    return await this.prisma.user.findFirst({ where: { id } });
  }
}
