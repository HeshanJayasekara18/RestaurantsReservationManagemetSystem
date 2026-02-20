import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { LoginDto } from './dto/login.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffRole } from './types/staff-role.type';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ─── STAFF ──────────────────────────────────────────────────────────────────

  /**
   * Create a staff member — only callable by ADMIN via controller guard.
   * First staff (ADMIN) can be seeded via this method with no restrictions.
   */
  async createStaff(dto: CreateStaffDto) {
    const existing = await this.prisma.staff.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);
    const staff = await this.prisma.staff.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
        role: (dto.role ?? 'WAITER') as StaffRole,
      },
      select: {
        id: true, name: true, email: true,
        role: true, isActive: true, createdAt: true,
      },
    });
    return staff;
  }

  async loginStaff(dto: LoginDto) {
    const staff = await this.prisma.staff.findUnique({
      where: { email: dto.email },
    });
    if (!staff || !staff.isActive)
      throw new UnauthorizedException('Invalid credentials');
    if (!await bcrypt.compare(dto.password, staff.password))
      throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: staff.id, email: staff.email, role: staff.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: staff.role,
      user: { id: staff.id, name: staff.name, email: staff.email, role: staff.role },
    };
  }

  // ─── CUSTOMERS ──────────────────────────────────────────────────────────────

  async registerCustomer(dto: RegisterCustomerDto) {
    const existing = await this.prisma.customer.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);
    const customer = await this.prisma.customer.create({
      data: { ...dto, password: hashed },
      select: {
        id: true, firstName: true, lastName: true,
        email: true, mobileNumber: true, loyaltyPoints: true, createdAt: true,
      },
    });
    return { user: customer, role: 'CUSTOMER' };
  }

  async loginCustomer(dto: LoginDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { email: dto.email },
    });
    if (!customer) throw new UnauthorizedException('Invalid credentials');
    if (!await bcrypt.compare(dto.password, customer.password))
      throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: customer.id, email: customer.email, role: 'CUSTOMER' };
    return {
      access_token: this.jwtService.sign(payload),
      role: 'CUSTOMER',
      user: {
        id: customer.id, email: customer.email,
        firstName: customer.firstName, lastName: customer.lastName,
      },
    };
  }

  // ─── STAFF LIST (admin only) ─────────────────────────────────────────────────

  async getAllStaff() {
    return this.prisma.staff.findMany({
      select: {
        id: true, name: true, email: true,
        role: true, isActive: true, createdAt: true,
      },
    });
  }
}
