import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuCategoryDto, CreateMenuItemDto } from './dto/create-menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // ─── Categories ─────────────────────────────────────────────────────────────

  /** ADMIN and MANAGER manage menu categories */
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('manage_menu')
  @Post('categories')
  createCategory(@Body() dto: CreateMenuCategoryDto) {
    return this.menuService.createCategory(dto);
  }

  /** Anyone can browse categories (public menu) */
  @Get('categories/restaurant/:restaurantId')
  findCategories(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.menuService.findCategoriesByRestaurant(restaurantId);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('manage_menu')
  @Delete('categories/:id')
  removeCategory(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.removeCategory(id);
  }

  // ─── Items ───────────────────────────────────────────────────────────────────

  /** ADMIN and MANAGER manage menu items */
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('manage_menu')
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('manage_menu')
  @Patch('items/:id')
  updateItem(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateMenuItemDto>) {
    return this.menuService.updateItem(id, dto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('manage_menu')
  @Delete('items/:id')
  removeItem(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.removeItem(id);
  }
}
