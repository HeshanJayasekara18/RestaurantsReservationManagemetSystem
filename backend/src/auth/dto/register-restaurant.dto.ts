import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
