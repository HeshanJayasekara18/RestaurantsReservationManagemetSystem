import { IsEmail, IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional() @IsString() firstName?: string;
  @IsOptional() @IsString() lastName?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() mobileNumber?: string;
  @IsOptional() @IsNumber() loyaltyPoints?: number;
}
