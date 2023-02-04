import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  // @IsStrongPassword({
  //   minLength: 6,
  //   minLowercase: 1,
  //   minUppercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  // })
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  bio: string;

  @IsOptional()
  @IsDateString()
  birtAt: Date;
}
