import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from './repository/users.repository';
import TestUtil from 'src/common/test/test-util';
import { AppModule } from 'src/app.module';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaUsersRepository } from './repository/implementations/prisma-users.repository';

describe('UsersService', () => {
  let usersService: UsersService;
  let prisma: PrismaService;
  let usersRepository: PrismaUsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        UsersService,
        { provide: UsersRepository, useClass: PrismaUsersRepository },
      ],
    }).compile();

    prisma = module.get(PrismaService);
    await prisma.cleanDatabase();
    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<PrismaUsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUserService', () => {
    it('should return status 409 if user already exist', async () => {
      const user = TestUtil.giveValidUser();
      await usersRepository.createUser(user);

      try {
        await usersService.createUser(user);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.CONFLICT);
      }
    });

    it('should create a user sucessfully', async () => {
      const user = TestUtil.giveValidUser();

      const createdUser = await usersService.createUser(user);
      expect(createdUser).toHaveProperty('id');
      expect(createdUser).toHaveProperty('name');
      expect(createdUser).toHaveProperty('email');
      expect(createdUser).toHaveProperty('password');
      expect(createdUser).toHaveProperty('avatar');
    });
  });
});
