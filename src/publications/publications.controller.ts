import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { AuthGuard } from 'src/auth/AuthGuard/auth.guard';
import { User as UserRequest } from '../auth/decorator/user.decorator';
import { User } from '@prisma/client';

@Controller()
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @UseGuards(AuthGuard)
  @Post('publication')
  async createPublication(
    @Body() body: CreatePublicationDTO,
    @UserRequest() user: User,
  ) {
    return await this.publicationsService.createPublication(body, user.id);
  }

  @UseGuards(AuthGuard)
  @Get('publications')
  async getUserPublications(@UserRequest() user: User) {
    return this.publicationsService.getAllUserPublications(user.id);
  }
}
