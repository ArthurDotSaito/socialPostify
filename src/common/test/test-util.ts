import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import { CreatePublicationDTO } from 'src/publications/dto/create-publication.dto';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';

export default class TestUtil {
  static giveValidUser() {
    const user: CreateUserDTO = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: '12345@aA',
      avatar: faker.internet.avatar(),
    };
    return user;
  }

  static generateJwtToken(userId: string) {
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ sub: userId }, secretKey, {
      expiresIn: '1h',
    });
    return token;
  }

  static generatePublicationBody() {
    const publicationBody: CreatePublicationDTO = {
      image: faker.internet.avatar(),
      title: faker.internet.domainWord(),
      text: faker.lorem.word(),
      dateToPublish: faker.date.future().toISOString(),
      published: false,
      socialMedia: 'LinkedIn',
    };
    return publicationBody;
  }
}
