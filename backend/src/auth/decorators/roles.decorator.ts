import { SetMetadata } from '@nestjs/common';
import { StaffRole } from '../types/staff-role.type';

export type Role = StaffRole | 'CUSTOMER';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);


