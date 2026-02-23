import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.customer.findMany({
      select: {
        id: true, firstName: true, lastName: true,
        email: true, mobileNumber: true, loyaltyPoints: true, createdAt: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.customer.findUnique({
      where: { id },
      select: {
        id: true, firstName: true, lastName: true,
        email: true, mobileNumber: true, loyaltyPoints: true, createdAt: true,
      },
    });
  }

  update(id: number, dto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: dto,
      select: {
        id: true, firstName: true, lastName: true,
        email: true, mobileNumber: true, loyaltyPoints: true, createdAt: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.customer.delete({ where: { id } });
  }

  getReservations(customerId: number) {
    return this.prisma.reservation.findMany({
      where: { customerId },
      include: { restaurant: true, table: true },
      orderBy: { reservationDate: 'asc' },
    });
  }
}
