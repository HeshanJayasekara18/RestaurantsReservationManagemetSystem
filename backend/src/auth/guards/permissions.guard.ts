import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user || !user.role) {
      throw new ForbiddenException('User authentication or role missing');
    }

    // Role 'CUSTOMER' doesn't use the RolePermission table
    if (user.role === 'CUSTOMER') {
        if (requiredPermissions.includes('CUSTOMER')) {
            return true;
        }
        throw new ForbiddenException('Insufficient permissions');
    }

    // Admins implicitly have all permissions
    if (user.role === 'ADMIN') {
        return true;
    }

    const rolePerms = await this.prisma.rolePermission.findUnique({
      where: { role: user.role }
    });

    if (!rolePerms) {
       throw new ForbiddenException(`Permissions not set for role: ${user.role}`);
    }

    // Check if the user's role has any of the required permissions
    const hasPermission = requiredPermissions.some(perm => rolePerms.permissions.includes(perm));
    
    if (!hasPermission) {
        throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
