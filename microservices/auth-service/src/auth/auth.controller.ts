import {
  Controller, Post, Get, Patch, Delete,
  Body, Param, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { StaffRole } from './types/staff-role.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ─── PUBLIC ──────────────────────────────────────────────────────────
  @Post('login/staff')
  loginStaff(@Body() dto: LoginDto) {
    return this.authService.loginStaff(dto);
  }

  @Post('login/customer')
  loginCustomer(@Body() dto: LoginDto) {
    return this.authService.loginCustomer(dto);
  }

  @Post('register/customer')
  registerCustomer(@Body() dto: RegisterCustomerDto) {
    return this.authService.registerCustomer(dto);
  }

  // ─── PROTECTED (ADMIN only) ───────────────────────────────────────────
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('staff')
  createStaff(@Body() dto: CreateStaffDto) {
    return this.authService.createStaff(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Get('staff')
  getAllStaff() {
    return this.authService.getAllStaff();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('staff/:id')
  updateStaff(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { isActive?: boolean; role?: StaffRole },
  ) {
    return this.authService.updateStaff(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete('staff/:id')
  deleteStaff(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteStaff(id);
  }

  // ─── ROLES ───────────────────────────────────────────────────────────
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Get('roles')
  getRoles() {
    return this.authService.getRoles();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('roles/:role')
  updateRolePermissions(
    @Param('role') role: StaffRole,
    @Body('permissions') permissions: string[],
  ) {
    return this.authService.updateRolePermissions(role, permissions);
  }
}
