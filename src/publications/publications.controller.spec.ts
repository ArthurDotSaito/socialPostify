import { Test, TestingModule } from '@nestjs/testing';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from 'src/app.module';
import { PublicationsRepository } from './repository/publications.repository';
import { PublicationsPrismaRepository } from './repository/implementations/prisma-publication.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/repository/users.repository';
import { PrismaUsersRepository } from 'src/users/repository/implementations/prisma-users.repository';
import TestUtil from 'src/common/test/test-util';
import { UsersController } from 'src/users/users.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { AuthGuard } from 'src/auth/AuthGuard/auth.guard';

describe('PublicationsController', () => {
  let publicationsController: PublicationsController;
  let usersController: UsersController;
  let publicationsService: PublicationsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, JwtModule],
      controllers: [PublicationsController],
      providers: [
        PublicationsService,
        {
          provide: PublicationsRepository,
          useClass: PublicationsPrismaRepository,
        },
        UsersService,
        {
          provide: UsersRepository,
          useClass: PrismaUsersRepository,
        },
        AuthService,
      ],
    }).compile();

    publicationsController = module.get<PublicationsController>(
      PublicationsController,
    );
    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(publicationsController).toBeDefined();
  });

  describe('POST /publication', () => {
    it('Should require authentication for creating a publication', async () => {
      const userData = TestUtil.giveValidUser();
      const user = await usersController.createUser(userData);
      const publicationBody = TestUtil.generatePublicationBody();
      jest.spyOn(AuthGuard.prototype, 'canActivate').mockResolvedValue(false);

      try {
        const response = await publicationsController.createPublication(
          publicationBody,
          user,
        );
        console.log(response);
      } catch (error) {
        // Expecting the error to be an instance of HttpException with 401 status
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toEqual('Unauthorized');
        expect(error.status).toBe(401);
      }
    });

    /*     it('Should create a publication and return his properties', async () => {
            /*       const userId = createdUser.id;
      const token = TestUtil.generateJwtToken(userId); 
    }); */
  });
});
