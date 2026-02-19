import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.reservationsService.create(dto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get('restaurant/:restaurantId')
  findByRestaurant(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.reservationsService.findByRestaurant(restaurantId);
  }

  @Get('customer/:customerId')
  findByCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.reservationsService.findByCustomer(customerId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateReservationDto) {
    return this.reservationsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.remove(id);
  }
}
