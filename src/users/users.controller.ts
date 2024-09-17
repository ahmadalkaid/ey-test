import { Body, Controller, Post, Logger, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    this.logger.log('Creating a new user', createUserDto);

    try {
        const existingUser = await this.usersService.findUserByEmail(createUserDto.email);
        if (existingUser) {
          throw new ConflictException('User with this email already exists');
        }
        return this.usersService.create(createUserDto);
      } catch (error) {
        this.logger.error('Error creating user', error);
        throw error;
      }
  }
}
