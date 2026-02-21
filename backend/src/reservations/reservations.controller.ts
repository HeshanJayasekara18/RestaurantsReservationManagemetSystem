import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

/** All reservation routes require a valid JWT */
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  /** Customers make reservations */
  @RequirePermissions('CUSTOMER')
  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.reservationsService.create(dto);
  }

  /** ADMIN, MANAGER, WAITER can list all reservations */
  @RequirePermissions('manage_reservations')
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  /** ADMIN, MANAGER, WAITER can see reservations by restaurant */
  @RequirePermissions('manage_reservations')
  @Get('restaurant/:restaurantId')
  findByRestaurant(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.reservationsService.findByRestaurant(restaurantId);
  }

  /** Customer can see their own reservations; staff can see any */
  @RequirePermissions('manage_reservations', 'CUSTOMER')
  @Get('customer/:customerId')
  findByCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.reservationsService.findByCustomer(customerId);
  }

  /** Any authenticated user can view a single reservation */
  @RequirePermissions('manage_reservations', 'CUSTOMER')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.findOne(id);
  }

  /** Staff (ADMIN/MANAGER/WAITER) and customer can update reservation */
  @RequirePermissions('manage_reservations', 'CUSTOMER')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateReservationDto) {
    return this.reservationsService.update(id, dto);
  }

  /** ADMIN or MANAGER can cancel/delete reservations */
  @RequirePermissions('manage_reservations', 'CUSTOMER')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.remove(id);
  }
}
