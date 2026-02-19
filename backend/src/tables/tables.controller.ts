import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  create(@Body() dto: CreateTableDto) {
    return this.tablesService.create(dto);
  }

  @Get()
  findAll() {
    return this.tablesService.findAll();
  }

  @Get('restaurant/:restaurantId')
  findByRestaurant(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.tablesService.findByRestaurant(restaurantId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tablesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTableDto) {
    return this.tablesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tablesService.remove(id);
  }
}
