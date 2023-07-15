import { Body, Controller, Post, Req } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDTO } from './dto/create-publication.dto';

interface RequestWithUserId extends Request {
  userId: string;
}

@Controller()
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post('publication')
  async createPublication(
    @Body() body: CreatePublicationDTO,
    @Req() request: RequestWithUserId,
  ) {
    return await this.publicationsService.createPublication(
      body,
      request.userId,
    );
  }
}
