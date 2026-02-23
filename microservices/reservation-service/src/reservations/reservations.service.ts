import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateReservationDto) {
    return this.prisma.reservation.create({
      data: {
        restaurantId: dto.restaurantId,
        customerId: dto.customerId,
        tableId: dto.tableId,
        reservationDate: new Date(dto.reservationDate),
        startTime: new Date(`1970-01-01T${dto.startTime}:00Z`),
        endTime: dto.endTime ? new Date(`1970-01-01T${dto.endTime}:00Z`) : undefined,
        guestCount: dto.guestCount,
        specialRequest: dto.specialRequest,
      },
    });
  }

  findAll() {
    return this.prisma.reservation.findMany({
      include: { customer: true, restaurant: true, table: true },
      orderBy: { reservationDate: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.reservation.findUnique({
      where: { id },
      include: { customer: true, restaurant: true, table: true, decoration: true, orders: true },
    });
  }

  findByRestaurant(restaurantId: number) {
    return this.prisma.reservation.findMany({
      where: { restaurantId },
      include: { customer: true, table: true },
      orderBy: { reservationDate: 'asc' },
    });
  }

  findByCustomer(customerId: number) {
    return this.prisma.reservation.findMany({
      where: { customerId },
      include: { restaurant: true, table: true },
      orderBy: { reservationDate: 'asc' },
    });
  }

  update(id: number, dto: UpdateReservationDto) {
    return this.prisma.reservation.update({
      where: { id },
      data: {
        ...(dto.tableId !== undefined && { tableId: dto.tableId }),
        ...(dto.reservationDate && { reservationDate: new Date(dto.reservationDate) }),
        ...(dto.startTime && { startTime: new Date(`1970-01-01T${dto.startTime}:00Z`) }),
        ...(dto.endTime && { endTime: new Date(`1970-01-01T${dto.endTime}:00Z`) }),
        ...(dto.guestCount !== undefined && { guestCount: dto.guestCount }),
        ...(dto.specialRequest !== undefined && { specialRequest: dto.specialRequest }),
        ...(dto.status && { status: dto.status }),
      },
    });
  }

  remove(id: number) {
    return this.prisma.reservation.delete({ where: { id } });
  }
}
