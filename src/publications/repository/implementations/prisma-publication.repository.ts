import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { PublicationsRepository } from '../publications.repository';
import { CreatePublicationDTO } from 'src/publications/dto/create-publication.dto';
import { Publication, SocialMedia } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicationsPrismaRepository implements PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getPublicationWithTitle(title: string): Promise<Publication> {
    return await this.prisma.publication.findFirst({ where: { title } });
  }

  async getAllUserPublications(userId: string): Promise<Publication[]> {
    return await this.prisma.publication.findMany({
      where: {
        userId,
      },
    });
  }

  async createPublication(
    data: CreatePublicationDTO,
    userId: string,
  ): Promise<void> {
    await this.prisma.publication.create({
      data: {
        id: uuidv4(),
        image: data.image,
        title: data.title,
        text: data.text,
        dateToPublish: new Date(data.dateToPublish),
        published: data.published,
        socialMedia: data.socialMedia as SocialMedia,
        userId,
      },
    });
  }
}
