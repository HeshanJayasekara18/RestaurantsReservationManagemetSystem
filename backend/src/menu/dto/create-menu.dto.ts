export class CreateMenuCategoryDto {
  restaurantId: number;
  name: string;
}

export class CreateMenuItemDto {
  restaurantId: number;
  categoryId?: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable?: boolean;
}
