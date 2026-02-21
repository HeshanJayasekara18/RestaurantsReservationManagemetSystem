import { create } from 'zustand';
import { authApi } from '../api';

export type Permission = 'manage_staff' | 'view_reports' | 'manage_menu' | 'manage_tables' | 'manage_reservations' | 'view_orders';

export interface RoleDefinition {
  code: string;
  name: string;
  description: string;
  usersCount: number;
  permissions: Permission[];
}

interface RolesState {
  roles: RoleDefinition[];
  loading: boolean;
  error: string | null;
  fetchRoles: () => Promise<void>;
  updateRolePermissions: (roleCode: string, newPermissions: Permission[]) => Promise<void>;
}

export const useRolesStore = create<RolesState>((set) => ({
  roles: [],
  loading: false,
  error: null,
  fetchRoles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await authApi.getRoles();
      set({ roles: response.data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch roles', loading: false });
    }
  },
  updateRolePermissions: async (roleCode: string, newPermissions: Permission[]) => {
    set({ loading: true, error: null });
    try {
      await authApi.updateRolePermissions(roleCode, newPermissions);
      set((state) => ({
        roles: state.roles.map((r) => 
          r.code === roleCode ? { ...r, permissions: newPermissions } : r
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to update permissions', loading: false });
      throw err;
    }
  },
}));
