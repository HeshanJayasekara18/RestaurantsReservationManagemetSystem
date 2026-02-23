import { IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsNumber() restaurantId: number;
  @IsNumber() customerId: number;
  @IsOptional() @IsNumber() tableId?: number;

  @IsDateString() reservationDate: string;  // e.g. "2025-12-31"
  @IsString()     startTime: string;        // e.g. "19:00"
  @IsOptional() @IsString() endTime?: string;

  @IsNumber() guestCount: number;
  @IsOptional() @IsString() specialRequest?: string;
}
