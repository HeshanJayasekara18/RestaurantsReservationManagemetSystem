import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { LoginDto } from './dto/login.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffRole } from './types/staff-role.type';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    await this.seedDefaultPermissions();
  }

  private async seedDefaultPermissions() {
    const defaultRoles: Record<StaffRole, string[]> = {
      ADMIN: ['manage_staff', 'view_reports', 'manage_menu', 'manage_tables', 'manage_reservations', 'view_orders'],
      MANAGER: ['view_reports', 'manage_menu', 'manage_tables', 'manage_reservations', 'view_orders'],
      WAITER: ['manage_reservations', 'view_orders'],
      KITCHEN: ['view_orders'],
    };

    for (const [role, permissions] of Object.entries(defaultRoles)) {
      await this.prisma.rolePermission.upsert({
        where: { role: role as StaffRole },
        update: {},
        create: { role: role as StaffRole, permissions },
      });
    }
    console.log('[AUTH-SERVICE] Role permissions seeded.');
  }

  // ─── STAFF ────────────────────────────────────────────────────────

  async createStaff(dto: CreateStaffDto) {
    const existing = await this.prisma.staff.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);
    return this.prisma.staff.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
        role: (dto.role ?? 'WAITER') as StaffRole,
      },
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
    });
  }

  async updateStaff(id: number, data: { isActive?: boolean; role?: StaffRole }) {
    const staff = await this.prisma.staff.findUnique({ where: { id } });
    if (!staff) throw new UnauthorizedException('Staff not found');
    return this.prisma.staff.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
    });
  }

  async deleteStaff(id: number) {
    const staff = await this.prisma.staff.findUnique({ where: { id } });
    if (!staff) throw new UnauthorizedException('Staff not found');
    await this.prisma.staff.delete({ where: { id } });
    return { success: true, message: 'Staff member deleted' };
  }

  async loginStaff(dto: LoginDto) {
    const staff = await this.prisma.staff.findUnique({ where: { email: dto.email } });
    if (!staff || !staff.isActive) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, staff.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: staff.id, email: staff.email, role: staff.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: staff.role,
      user: { id: staff.id, name: staff.name, email: staff.email, role: staff.role },
    };
  }

  async getAllStaff() {
    return this.prisma.staff.findMany({
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
    });
  }

  // ─── CUSTOMERS ─────────────────────────────────────────────────────

  async registerCustomer(dto: RegisterCustomerDto) {
    const existing = await this.prisma.customer.findUnique({ where: { email: dto.email } });
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
    const customer = await this.prisma.customer.findUnique({ where: { email: dto.email } });
    if (!customer) throw new UnauthorizedException('Invalid credentials');
    if (!await bcrypt.compare(dto.password, customer.password))
      throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: customer.id, email: customer.email, role: 'CUSTOMER' };
    return {
      access_token: this.jwtService.sign(payload),
      role: 'CUSTOMER',
      user: { id: customer.id, email: customer.email, firstName: customer.firstName, lastName: customer.lastName },
    };
  }

  // ─── ROLES ──────────────────────────────────────────────────────────

  async getRoles() {
    const roles = await this.prisma.rolePermission.findMany();
    const roleStats = await this.prisma.staff.groupBy({ by: ['role'], _count: { id: true } });

    return roles.map(roleData => {
      const stats = roleStats.find(s => s.role === roleData.role);
      let name = roleData.role.charAt(0) + roleData.role.slice(1).toLowerCase();
      if (roleData.role === 'ADMIN') name = 'Administrator';
      if (roleData.role === 'KITCHEN') name = 'Kitchen Staff';

      const descriptions: Record<string, string> = {
        ADMIN: 'Full system access.',
        MANAGER: 'Operational control.',
        WAITER: 'Front of house staff.',
        KITCHEN: 'Back of house staff.',
      };

      return {
        code: roleData.role,
        name,
        description: descriptions[roleData.role] ?? '',
        permissions: roleData.permissions,
        usersCount: stats?._count.id || 0,
      };
    });
  }

  async updateRolePermissions(role: StaffRole, permissions: string[]) {
    if (role === 'ADMIN') throw new ConflictException('Cannot modify ADMIN permissions');
    return this.prisma.rolePermission.update({ where: { role }, data: { permissions } });
  }
}
