import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PublicationsModule } from './publications/publications.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, PublicationsModule],
})
export class AppModule {}
