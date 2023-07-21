import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from 'src/app.module';
import TestUtil from 'src/common/test/test-util';
import { User } from './entity/User';

const mockService = {
  createUser: jest.fn(),
  findById: jest.fn(),
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockService,
        },
      ],
    }).compile();

    prisma = module.get(PrismaService);
    await prisma.cleanDatabase();
    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    it('Should return a user sucessfully', async () => {
      const user = TestUtil.giveValidUser();
      mockService.createUser(user);

      const createdUser = await usersService.createUser(user);
      expect(mockService.createUser).toBeCalledTimes(1);
      expect(createdUser).toHaveProperty('id');
      expect(createdUser).toHaveProperty('name');
      expect(createdUser).toHaveProperty('email');
      expect(createdUser).toHaveProperty('password');
      expect(createdUser).toHaveProperty('avatar');
    });
  });
});
