'use client';

import { useState } from 'react';
import { 
  Shield, 
  Check, 
  X, 
  Users, 
  Lock,
  Edit,
  Save
} from 'lucide-react';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import { Switch } from '../../../ui/switch';
import { toast } from 'sonner';

// Mock Data for Roles & Permissions
// In a real app, these would come from the backend or be derived from guards
type Permission = 'manage_staff' | 'view_reports' | 'manage_menu' | 'manage_tables' | 'manage_reservations' | 'view_orders';

interface RoleDefinition {
  code: string;
  name: string;
  description: string;
  usersCount: number;
  permissions: Permission[];
}

const initialRoles: RoleDefinition[] = [
  {
    code: 'ADMIN',
    name: 'Administrator',
    description: 'Full system access. Can manage staff, reports, and settings.',
    usersCount: 2,
    permissions: ['manage_staff', 'view_reports', 'manage_menu', 'manage_tables', 'manage_reservations', 'view_orders'],
  },
  {
    code: 'MANAGER',
    name: 'Manager',
    description: 'Operational control. Can manage day-to-day activities but restricted from sensitive actions.',
    usersCount: 3,
    permissions: ['view_reports', 'manage_menu', 'manage_tables', 'manage_reservations', 'view_orders'],
  },
  {
    code: 'WAITER',
    name: 'Waiter',
    description: 'Front of house staff. Can manage reservations and take orders.',
    usersCount: 8,
    permissions: ['manage_reservations', 'view_orders'],
  },
  {
    code: 'KITCHEN',
    name: 'Kitchen Staff',
    description: 'Back of house staff. Read-only access to orders queue.',
    usersCount: 5,
    permissions: ['view_orders'],
  },
];

const allPermissions: { key: Permission; label: string }[] = [
  { key: 'manage_staff', label: 'Manage Staff (Add/Remove)' },
  { key: 'view_reports', label: 'View Financial Reports' },
  { key: 'manage_menu', label: 'Edit Menu & Prices' },
  { key: 'manage_tables', label: 'Manage Floor Plan' },
  { key: 'manage_reservations', label: 'Create/Edit Reservations' },
  { key: 'view_orders', label: 'View Active Orders' },
];

export function RolesView() {
  const [roles, setRoles] = useState<RoleDefinition[]>(initialRoles);
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [tempPermissions, setTempPermissions] = useState<Permission[]>([]);

  const handleEditClick = (role: RoleDefinition) => {
    if (role.code === 'ADMIN') {
      toast.error("Admin role permissions cannot be modified.");
      return;
    }
    setEditingRole(role.code);
    setTempPermissions([...role.permissions]);
  };

  const handlePermissionToggle = (perm: Permission) => {
    if (tempPermissions.includes(perm)) {
      setTempPermissions(tempPermissions.filter((p) => p !== perm));
    } else {
      setTempPermissions([...tempPermissions, perm]);
    }
  };

  const handleSave = () => {
    setRoles(roles.map(r => r.code === editingRole ? { ...r, permissions: tempPermissions } : r));
    setEditingRole(null);
    toast.success("Role permissions updated successfully");
  };

  const handleCancel = () => {
    setEditingRole(null);
    setTempPermissions([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Roles & Permissions</h2>
          <p className="text-muted-foreground">
            Manage system access levels for staff members.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {roles.map((role) => (
          <Card key={role.code} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                        {role.name}
                        {role.code === 'ADMIN' && <Badge variant="default" className="bg-primary/20 text-primary border-primary/20 hover:bg-primary/20">System</Badge>}
                    </CardTitle>
                    <CardDescription className="mt-1">
                        {role.description}
                    </CardDescription>
                  </div>
                  <div className="bg-muted p-2 rounded-full">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                  </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{role.usersCount} active users</span>
                    </div>
                    
                    <div className="border rounded-lg p-3 bg-muted/20">
                        <h4 className="font-medium text-sm mb-3">Permissions</h4>
                        <div className="space-y-2">
                            {allPermissions.map((perm) => {
                                const hasPermission = role.code === editingRole 
                                    ? tempPermissions.includes(perm.key)
                                    : role.permissions.includes(perm.key);
                                
                                const isEditing = role.code === editingRole;

                                return (
                                    <div key={perm.key} className="flex items-center justify-between text-sm">
                                        <span className={hasPermission ? 'text-foreground' : 'text-muted-foreground'}>
                                            {perm.label}
                                        </span>
                                        {isEditing ? (
                                             <Switch 
                                                checked={hasPermission}
                                                onCheckedChange={() => handlePermissionToggle(perm.key)}
                                             />
                                        ) : (
                                            hasPermission 
                                                ? <Check className="h-4 w-4 text-green-500" /> 
                                                : <X className="h-4 w-4 text-muted-foreground/30" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-2 border-t bg-muted/10">
                {editingRole === role.code ? (
                    <div className="flex gap-2 w-full">
                        <Button variant="default" className="flex-1" onClick={handleSave}>
                            <Save className="h-4 w-4 mr-2" /> Save Changes
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                ) : (
                     <Button 
                        variant="outline" 
                        className="w-full text-muted-foreground hover:text-foreground"
                        disabled={role.code === 'ADMIN'}
                        onClick={() => handleEditClick(role)}
                    >
                        <Edit className="h-4 w-4 mr-2" /> 
                        {role.code === 'ADMIN' ? 'Locked (System Role)' : 'Edit Permissions'}
                    </Button>
                )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
