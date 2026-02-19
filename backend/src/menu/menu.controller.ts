import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuCategoryDto, CreateMenuItemDto } from './dto/create-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // --- Categories ---
  @Post('categories')
  createCategory(@Body() dto: CreateMenuCategoryDto) {
    return this.menuService.createCategory(dto);
  }

  @Get('categories/restaurant/:restaurantId')
  findCategories(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.menuService.findCategoriesByRestaurant(restaurantId);
  }

  @Delete('categories/:id')
  removeCategory(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.removeCategory(id);
  }

  // --- Items ---
  @Post('items')
  createItem(@Body() dto: CreateMenuItemDto) {
    return this.menuService.createItem(dto);
  }

  @Get('items/restaurant/:restaurantId')
  findItems(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.menuService.findItemsByRestaurant(restaurantId);
  }

  @Get('items/:id')
  findItem(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }

  @Patch('items/:id')
  updateItem(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateMenuItemDto>) {
    return this.menuService.updateItem(id, dto);
  }

  @Delete('items/:id')
  removeItem(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.removeItem(id);
  }
}
