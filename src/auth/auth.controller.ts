import { Controller, Post, Body, Logger, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './signin.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private authService: AuthService,
  ) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
      return this.authService.signIn(signInDto);
  }
}
