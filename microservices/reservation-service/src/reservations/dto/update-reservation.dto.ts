import { IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateReservationDto {
  @IsOptional() @IsNumber() tableId?: number;
  @IsOptional() @IsDateString() reservationDate?: string;
  @IsOptional() @IsString() startTime?: string;
  @IsOptional() @IsString() endTime?: string;
  @IsOptional() @IsNumber() guestCount?: number;
  @IsOptional() @IsString() specialRequest?: string;
  @IsOptional() @IsString() status?: string;
}
