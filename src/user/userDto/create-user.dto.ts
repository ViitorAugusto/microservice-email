import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

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

  @IsOptional()
  @IsEnum(Role)
  role: number;
}
