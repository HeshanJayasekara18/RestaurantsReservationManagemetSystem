'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  MoreHorizontal, 
  Shield, 
  UserCog, 
  ChefHat, 
  Utensils, 
  Trash2,
  Mail,
  Lock
} from 'lucide-react';
import { Staff } from '@/lib/types';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { AddStaffDialog } from './AddStaffDialog';
import { toast } from 'sonner';

import { useStaffStore } from '@/lib/store/staffStore';

const roleIcons = {
  ADMIN: Shield,
  MANAGER: UserCog,
  WAITER: Utensils,
  KITCHEN: ChefHat,
};

const roleColors = {
  ADMIN: 'bg-red-500/10 text-red-500 border-red-500/20',
  MANAGER: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  WAITER: 'bg-green-500/10 text-green-500 border-green-500/20',
  KITCHEN: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
};

export function StaffView() {
  const { staffList, fetchStaff, createStaff, updateStaffStatus, deleteStaff, isLoading } = useStaffStore();

  React.useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const handleAddStaff = async (data: any) => {
    await createStaff(data);
  };

  const handleDelete = async (id: number) => {
    await deleteStaff(id);
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    await updateStaffStatus(id, !currentStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Staff Management</h2>
          <p className="text-muted-foreground text-sm">Manage access, roles, and shift assignments.</p>
        </div>
        <AddStaffDialog onAdd={handleAddStaff} />
      </div>

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Staff Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffList.map((staff) => {
              const RoleIcon = roleIcons[staff.role] ?? UserCog;
              return (
                <TableRow key={staff.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border">
                         <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${staff.name}`} />
                        <AvatarFallback>{staff.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{staff.name}</span>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <Mail className="h-3 w-3 mr-1" />
                            {staff.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${roleColors[staff.role]}`}>
                        <RoleIcon className="h-3.5 w-3.5" />
                        {staff.role}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={staff.isActive ? "default" : "secondary"} className={staff.isActive ? "bg-green-500 hover:bg-green-600" : ""}>
                        {staff.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(staff.createdAt), 'MMM dd, yyyy')}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleToggleStatus(staff.id, staff.isActive)}>
                            {staff.isActive ? 'Deactivate Account' : 'Activate Account'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(staff.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Staff
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
            {staffList.length === 0 && (
              <TableRow>
                 <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    {isLoading ? 'Loading staff...' : 'No staff members found.'}
                 </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
