import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateRestaurantDto) {
    return this.prisma.restaurant.create({ data: dto });
  }

  findAll() {
    return this.prisma.restaurant.findMany({
      select: {
        id: true, name: true, address: true,
        phone: true, email: true, createdAt: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: { tables: true, categories: true },
    });
  }

  update(id: number, dto: UpdateRestaurantDto) {
    return this.prisma.restaurant.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.restaurant.delete({ where: { id } });
  }
}
