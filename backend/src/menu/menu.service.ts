import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuCategoryDto, CreateMenuItemDto } from './dto/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  // --- Categories ---
  createCategory(dto: CreateMenuCategoryDto) {
    return this.prisma.menuCategory.create({ data: dto });
  }

  findCategoriesByRestaurant(restaurantId: number) {
    return this.prisma.menuCategory.findMany({
      where: { restaurantId },
      include: { menuItems: true },
    });
  }

  removeCategory(id: number) {
    return this.prisma.menuCategory.delete({ where: { id } });
  }

  // --- Items ---
  createItem(dto: CreateMenuItemDto) {
    return this.prisma.menuItem.create({ data: { ...dto, price: dto.price as any } });
  }

  findItemsByRestaurant(restaurantId: number) {
    return this.prisma.menuItem.findMany({
      where: { restaurantId, isAvailable: true },
      include: { category: true },
    });
  }

  findOne(id: number) {
    return this.prisma.menuItem.findUnique({ where: { id } });
  }

  updateItem(id: number, data: Partial<CreateMenuItemDto>) {
    return this.prisma.menuItem.update({ where: { id }, data: data as any });
  }

  removeItem(id: number) {
    return this.prisma.menuItem.delete({ where: { id } });
  }
}
