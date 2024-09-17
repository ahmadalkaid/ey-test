import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './signin.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    try {
      this.logger.log('Signin user', signInDto);
      const user = await this.usersService.findUserByEmail(signInDto.email);
      //this.logger.log('user info', user);

      if (user && user.password === signInDto.password) {
        const payload = { username: user.username, password: user.password };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
      throw new ConflictException('The email or password does not exist.');
    } catch (error) {
      this.logger.error('Error signin user', error);
      throw error;
    }
  }
}
