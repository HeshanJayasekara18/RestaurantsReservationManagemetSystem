import { create } from 'zustand';
import { dashboardApi } from '@/lib/api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface RevenuePoint {
  name: string;
  revenue: number;
  orders: number;
}

interface CategoryPoint {
  name: string;
  sales: number;
}

interface ReportsState {
  revenue: number;
  totalOrders: number;
  activeCustomers: number;
  avgOrderValue: number;
  revenueData: RevenuePoint[];
  categoryData: CategoryPoint[];
  isLoading: boolean;
  error: string | null;
  fetchReports: () => Promise<void>;
}

export const useReportsStore = create<ReportsState>((set) => ({
  revenue: 0,
  totalOrders: 0,
  activeCustomers: 0,
  avgOrderValue: 0,
  revenueData: [],
  categoryData: [],
  isLoading: false,
  error: null,

  fetchReports: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await dashboardApi.getStats();
      const data = response.data;
      
      const revenue = data.revenue || 0;
      const totalOrders = data.totalOrders || 0;
      
      set({ 
        revenue,
        totalOrders,
        activeCustomers: data.totalCustomers || 0,
        avgOrderValue: totalOrders > 0 ? Number((revenue / totalOrders).toFixed(2)) : 0,
        revenueData: data.revenueChart || [],
        categoryData: data.categoryData || [],
        isLoading: false 
      });
    } catch (error) {
      const msg = error instanceof AxiosError ? error.response?.data?.message || error.message : 'Failed to load report data';
      set({ error: msg, isLoading: false });
      toast.error(msg);
    }
  },
}));
