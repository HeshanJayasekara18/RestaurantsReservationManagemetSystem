import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser, StaffRole } from '@/lib/types';

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  role: StaffRole | 'CUSTOMER' | null;
  login: (token: string, user: AuthUser, role: StaffRole | 'CUSTOMER') => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  hasRole: (...roles: Array<StaffRole | 'CUSTOMER'>) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      role: null,

      login: (token, user, role) => set({ token, user, role }),

      logout: () => set({ token: null, user: null, role: null }),

      isAuthenticated: () => !!get().token,

      hasRole: (...roles) => {
        const role = get().role;
        return role !== null && roles.includes(role);
      },
    }),
    {
      name: 'erp-auth', // localStorage key
    }
  )
);
