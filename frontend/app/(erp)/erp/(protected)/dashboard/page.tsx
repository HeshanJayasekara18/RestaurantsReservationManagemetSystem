import { DashboardHeader } from '@/componets/erp/admin/dashboard/DashboardHeader';
import { StatsGrid } from '@/componets/erp/admin/dashboard/StatsGrid';
import { RevenueChart } from '@/componets/erp/admin/dashboard/RevenueChart';
import { RecentOrdersTable } from '@/componets/erp/admin/dashboard/RecentOrdersTable';
import { OccupancyCard } from '@/componets/erp/admin/dashboard/OccupancyCard';

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-6">
      <DashboardHeader />
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <RevenueChart />
        <OccupancyCard />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <RecentOrdersTable />
      </div>
    </div>
  );
}
