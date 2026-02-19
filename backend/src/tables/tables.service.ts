import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTableDto) {
    return this.prisma.diningTable.create({ data: dto });
  }

  findAll() {
    return this.prisma.diningTable.findMany();
  }

  findByRestaurant(restaurantId: number) {
    return this.prisma.diningTable.findMany({
      where: { restaurantId, isActive: true },
    });
  }

  findOne(id: number) {
    return this.prisma.diningTable.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateTableDto) {
    return this.prisma.diningTable.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.diningTable.delete({ where: { id } });
  }
}
