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
        update: {}, // Don't overwrite if they already exist (let admins customize it)
        create: {
          role: role as StaffRole,
          permissions,
        },
      });
    }
    console.log('Role permissions seeded.');
  }

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

  async updateStaff(id: number, data: { isActive?: boolean; role?: StaffRole }) {
    const staff = await this.prisma.staff.findUnique({ where: { id } });
    if (!staff) throw new UnauthorizedException('Staff not found');

    // Prevent changing the last ADMIN's status or role to avoid locking out the system
    // (A more robust system would actually count active ADMINs first)
    // For now, we allow it, but in production, we'd add safeguards.
    
    return this.prisma.staff.update({
      where: { id },
      data,
      select: {
        id: true, name: true, email: true,
        role: true, isActive: true, createdAt: true,
      }
    });
  }

  async deleteStaff(id: number) {
    const staff = await this.prisma.staff.findUnique({ where: { id } });
    if (!staff) throw new UnauthorizedException('Staff not found');
    
    await this.prisma.staff.delete({ where: { id } });
    return { success: true, message: 'Staff member deleted' };
  }

  async loginStaff(dto: LoginDto) {
    const staff = await this.prisma.staff.findUnique({
      where: { email: dto.email },
    });

    if (!staff || !staff.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, staff.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

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

  // ─── ROLES & PERMISSIONS ──────────────────────────────────────────────────────

  async getRoles() {
    const roles = await this.prisma.rolePermission.findMany();
    // Also include user counts for each role to display in the UI
    const roleStats = await this.prisma.staff.groupBy({
      by: ['role'],
      _count: { id: true }
    });

    return roles.map(roleData => {
      const stats = roleStats.find(s => s.role === roleData.role);
      let name = roleData.role.charAt(0) + roleData.role.slice(1).toLowerCase();
      if (roleData.role === 'ADMIN') name = 'Administrator';
      if (roleData.role === 'KITCHEN') name = 'Kitchen Staff';

      let description = '';
      if (roleData.role === 'ADMIN') description = 'Full system access. Can manage staff, reports, and settings.';
      if (roleData.role === 'MANAGER') description = 'Operational control. Can manage day-to-day activities.';
      if (roleData.role === 'WAITER') description = 'Front of house staff. Can manage reservations and take orders.';
      if (roleData.role === 'KITCHEN') description = 'Back of house staff. Read-only access to orders queue.';

      return {
        code: roleData.role,
        name,
        description,
        permissions: roleData.permissions,
        usersCount: stats?._count.id || 0,
      };
    });
  }

  async updateRolePermissions(role: StaffRole, permissions: string[]) {
    if (role === 'ADMIN') {
      throw new ConflictException('Cannot modify ADMIN permissions');
    }

    return this.prisma.rolePermission.update({
      where: { role },
      data: { permissions }
    });
  }
}
