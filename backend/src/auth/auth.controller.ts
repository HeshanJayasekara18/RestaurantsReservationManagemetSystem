import { Controller, Post, Body, Get, Patch, Delete, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { LoginDto } from './dto/login.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RequirePermissions } from './decorators/permissions.decorator';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ─── Staff ─────────────────────────────────────────────────────────────────

  /** Login endpoint for all staff roles (ADMIN, MANAGER, WAITER, KITCHEN) */
  @Post('login/staff')
  loginStaff(@Body() dto: LoginDto) {
    return this.authService.loginStaff(dto);
  }

  /** Create a new staff member — only ADMIN can do this */
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('manage_staff')
  @Post('staff')
  createStaff(@Body() dto: CreateStaffDto) {
    return this.authService.createStaff(dto);
  }

  /** List all staff — only ADMIN */
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('manage_staff')
  @Get('staff')
  getAllStaff() {
    return this.authService.getAllStaff();
  }

  /** Update staff (e.g., deactivate) — only ADMIN */
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('manage_staff')
  @Patch('staff/:id')
  updateStaff(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { isActive?: boolean; role?: string }
  ) {
    return this.authService.updateStaff(id, data as any);
  }

  /** Delete staff — only ADMIN */
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('manage_staff')
  @Delete('staff/:id')
  deleteStaff(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteStaff(id);
  }

  // ─── Roles & Permissions ───────────────────────────────────────────────────

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('manage_staff')
  @Get('roles')
  getRoles() {
    return this.authService.getRoles();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('manage_staff')
  @Patch('roles/:role/permissions')
  updateRolePermissions(
    @Param('role') role: any,
    @Body('permissions') permissions: string[]
  ) {
    return this.authService.updateRolePermissions(role, permissions);
  }

  // ─── Customer ──────────────────────────────────────────────────────────────

  @Post('register/customer')
  registerCustomer(@Body() dto: RegisterCustomerDto) {
    return this.authService.registerCustomer(dto);
  }

  @Post('login/customer')
  loginCustomer(@Body() dto: LoginDto) {
    return this.authService.loginCustomer(dto);
  }

  // ─── Current User (any authenticated role) ─────────────────────────────────

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: any) {
    return user;
  }
}
