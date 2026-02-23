import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  mobileNumber: string;
}
