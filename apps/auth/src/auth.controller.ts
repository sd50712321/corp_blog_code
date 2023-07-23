import { Controller, Get, Logger, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './curruent-user.decorator';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  protected readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.logger.log('user', user);
    await this.authService.login(user, response);
    response.send(user);
  }
}
