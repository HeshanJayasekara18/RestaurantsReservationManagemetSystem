import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

/** All reservation routes require a valid JWT */
@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  /** Customers make reservations */
  @UseGuards(RolesGuard)
  @Roles('CUSTOMER')
  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.reservationsService.create(dto);
  }

  /** ADMIN, MANAGER, WAITER can list all reservations */
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'WAITER')
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  /** ADMIN, MANAGER, WAITER can see reservations by restaurant */
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'WAITER')
  @Get('restaurant/:restaurantId')
  findByRestaurant(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.reservationsService.findByRestaurant(restaurantId);
  }

  /** Customer can see their own reservations; staff can see any */
  @UseGuards(RolesGuard)
  @Roles('CUSTOMER', 'ADMIN', 'MANAGER', 'WAITER')
  @Get('customer/:customerId')
  findByCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.reservationsService.findByCustomer(customerId);
  }

  /** Any authenticated user can view a single reservation */
  @UseGuards(RolesGuard)
  @Roles('CUSTOMER', 'ADMIN', 'MANAGER', 'WAITER')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.findOne(id);
  }

  /** Staff (ADMIN/MANAGER/WAITER) and customer can update reservation */
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'WAITER', 'CUSTOMER')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateReservationDto) {
    return this.reservationsService.update(id, dto);
  }

  /** ADMIN or MANAGER can cancel/delete reservations */
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'CUSTOMER')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.remove(id);
  }
}
