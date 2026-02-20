import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

const STAFF_ROLES = ['ADMIN', 'MANAGER', 'WAITER', 'KITCHEN'] as const;
export type StaffRole = typeof STAFF_ROLES[number];

export class CreateStaffDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(STAFF_ROLES)
  role?: StaffRole;
}
