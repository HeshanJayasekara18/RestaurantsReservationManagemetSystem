export class CreateReservationDto {
  restaurantId: number;
  customerId: number;
  tableId?: number;
  reservationDate: string; // ISO date string e.g. "2026-02-20"
  startTime: string;       // e.g. "18:00"
  endTime?: string;
  guestCount: number;
  specialRequest?: string;
}
