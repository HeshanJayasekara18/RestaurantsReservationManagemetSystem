import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuCategoryDto, CreateMenuItemDto } from './dto/create-menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // ─── Categories ─────────────────────────────────────────────────────────────

  /** ADMIN and MANAGER manage menu categories */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post('categories')
  createCategory(@Body() dto: CreateMenuCategoryDto) {
    return this.menuService.createCategory(dto);
  }

  /** Anyone can browse categories (public menu) */
  @Get('categories/restaurant/:restaurantId')
  findCategories(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.menuService.findCategoriesByRestaurant(restaurantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Delete('categories/:id')
  removeCategory(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.removeCategory(id);
  }

  // ─── Items ───────────────────────────────────────────────────────────────────

  /** ADMIN and MANAGER manage menu items */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post('items')
  createItem(@Body() dto: CreateMenuItemDto) {
    return this.menuService.createItem(dto);
  }

  /** Anyone can browse menu items (public menu) */
  @Get('items/restaurant/:restaurantId')
  findItems(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.menuService.findItemsByRestaurant(restaurantId);
  }

  @Get('items/:id')
  findItem(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }

  /** KITCHEN can see items but only ADMIN/MANAGER can modify */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Patch('items/:id')
  updateItem(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateMenuItemDto>) {
    return this.menuService.updateItem(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Delete('items/:id')
  removeItem(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.removeItem(id);
  }
}
