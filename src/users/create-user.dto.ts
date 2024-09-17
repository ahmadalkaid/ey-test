import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 0
  }, {
    message: 'Password needs 8+ characters, a lowercase letter, number, and symbol.',
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
