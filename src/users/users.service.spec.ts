import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from './repository/users.repository';
import TestUtil from 'src/common/test/test-util';
import { AppModule } from 'src/app.module';

const mockRepository = {
  createUser: jest.fn(),
  findUserByEmail: jest.fn(),
  findUserById: jest.fn(),
};

describe('UsersService', () => {
  let usersService: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockRepository },
      ],
    }).compile();

    prisma = module.get(PrismaService);
    await prisma.cleanDatabase();
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUserService', () => {
    it('should create a user sucessfully', async () => {
      const user = TestUtil.giveValidUser();
      mockRepository.createUser(user);

      const createdUser = await usersService.createUser(user);
      expect(mockRepository.createUser).toBeCalledTimes(1);
      expect(createdUser).toHaveProperty('id');
      expect(createdUser).toHaveProperty('name');
      expect(createdUser).toHaveProperty('email');
      expect(createdUser).toHaveProperty('password');
      expect(createdUser).toHaveProperty('avatar');
    });
  });
});
