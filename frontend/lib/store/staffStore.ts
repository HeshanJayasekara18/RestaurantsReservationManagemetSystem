import { create } from 'zustand';
import { Staff } from '@/lib/types';
import { authApi } from '@/lib/api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface StaffState {
  staffList: Staff[];
  isLoading: boolean;
  error: string | null;
  fetchStaff: () => Promise<void>;
  createStaff: (data: { name: string; email: string; password: string; role?: string }) => Promise<void>;
  updateStaffStatus: (id: number, isActive: boolean) => Promise<void>;
  deleteStaff: (id: number) => Promise<void>;
}

export const useStaffStore = create<StaffState>((set) => ({
  staffList: [],
  isLoading: false,
  error: null,

  fetchStaff: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.listStaff();
      set({ staffList: response.data, isLoading: false });
    } catch (error) {
      const msg = error instanceof AxiosError ? error.response?.data?.message || error.message : 'Failed to load staff';
      set({ error: msg, isLoading: false, staffList: [] });
      toast.error(msg);
    }
  },

  createStaff: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.createStaff(data);
      // The backend createStaff returns just the staff object without password
      set((state) => ({
        staffList: [...state.staffList, response.data],
        isLoading: false,
      }));
      toast.success('Staff member created successfully');
    } catch (error) {
      const msg = error instanceof AxiosError ? error.response?.data?.message || error.message : 'Failed to create staff';
      set({ error: msg, isLoading: false });
      toast.error(msg);
      throw error;
    }
  },

  updateStaffStatus: async (id, isActive) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.updateStaff(id, { isActive });
      set((state) => ({
        staffList: state.staffList.map((s) => (s.id === id ? { ...s, isActive: response.data.isActive } : s)),
        isLoading: false,
      }));
      toast.success(isActive ? 'Staff account activated' : 'Staff account deactivated');
    } catch (error) {
      const msg = error instanceof AxiosError ? error.response?.data?.message || error.message : 'Failed to update staff status';
      set({ error: msg, isLoading: false });
      toast.error(msg);
      throw error;
    }
  },

  deleteStaff: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.deleteStaff(id);
      set((state) => ({
        staffList: state.staffList.filter((s) => s.id !== id),
        isLoading: false,
      }));
      toast.success('Staff member removed forever');
    } catch (error) {
      const msg = error instanceof AxiosError ? error.response?.data?.message || error.message : 'Failed to delete staff';
      set({ error: msg, isLoading: false });
      toast.error(msg);
    }
  },
}));
