import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthSigninDTO } from './dto/auth-signin.dto';
import { AuthService } from './auth.service';
import { AuthSignupDTO } from './dto/auth.signup.dto';
import { User } from '@prisma/client';
import { AuthGuard } from './AuthGuard/auth.guard';
import { User as UserRequest } from './decorator/user.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() body: AuthSigninDTO) {
    return this.authService.signin(body);
  }

  @Post('signup')
  async signup(@Body() body: AuthSignupDTO) {
    return this.authService.signup(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async userLogged(@UserRequest() user: User) {
    return user;
  }
}
