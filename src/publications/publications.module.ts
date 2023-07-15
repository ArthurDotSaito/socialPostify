import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationsRepository } from './repository/publications.repository';
import { PublicationsPrismaRepository } from './repository/implementations/prisma-publication.repository';

@Module({
  controllers: [PublicationsController],
  providers: [
    PublicationsService,
    {
      provide: PublicationsRepository,
      useClass: PublicationsPrismaRepository,
    },
  ],
})
export class PublicationsModule {}
