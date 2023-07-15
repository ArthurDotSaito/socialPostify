import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationsRepository } from './repository/publications.repository';
import { CreatePublicationDTO } from './dto/create-publication.dto';

@Injectable()
export class PublicationsService {
  constructor(private readonly publicationRepository: PublicationsRepository) {}

  async createPublication(
    data: CreatePublicationDTO,
    userId: string,
  ): Promise<void> {
    const postExist = await this.publicationRepository.getPublicationWithTitle(
      data.title,
    );
    if (postExist)
      throw new HttpException('Post title already exist', HttpStatus.CONFLICT);

    await this.publicationRepository.createPublication(data, userId);
  }
}
