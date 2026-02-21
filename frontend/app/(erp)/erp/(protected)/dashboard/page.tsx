'use client';

import { useEffect, useState } from 'react';
import { DashboardHeader } from '@/componets/erp/admin/dashboard/DashboardHeader';
import { StatsGrid } from '@/componets/erp/admin/dashboard/StatsGrid';
import { RevenueChart } from '@/componets/erp/admin/dashboard/RevenueChart';
import { RecentOrdersTable } from '@/componets/erp/admin/dashboard/RecentOrdersTable';
import { OccupancyCard } from '@/componets/erp/admin/dashboard/OccupancyCard';
import { dashboardApi } from '@/lib/api';
import { toast } from 'sonner';

interface DashboardStats {
  revenue: number;
  totalOrders: number;
  reservationsToday: number;
  totalCustomers: number;
  recentOrders: Array<{
    id: number;
    customer: string;
    amount: number;
    status: string;
  }>;
  occupancy: {
    occupied: number;
    total: number;
  };
  revenueChart: Array<{
    name: string;
    revenue: number;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardApi.getStats();
        setStats(response.data);
      } catch (error) {
        toast.error("Failed to load dashboard statistics");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!stats) {
    return <div>Failed to load data.</div>;
  }

  return (
    <div className="space-y-6 pb-6">
      <DashboardHeader />
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <RevenueChart data={stats.revenueChart} />
        <OccupancyCard occupancy={stats.occupancy} />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <RecentOrdersTable orders={stats.recentOrders} />
      </div>
    </div>
  );
}
