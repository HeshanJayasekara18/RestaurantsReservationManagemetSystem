export class CreateTableDto {
  restaurantId: number;
  tableNumber: number;
  capacity: number;
  location?: string;
  isActive?: boolean;
}
