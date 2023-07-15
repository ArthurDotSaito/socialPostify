import { Publication } from '@prisma/client';
import { CreatePublicationDTO } from '../dto/create-publication.dto';

export abstract class PublicationsRepository {
  abstract createPublication(
    data: CreatePublicationDTO,
    userId: string,
  ): Promise<void>;
}
