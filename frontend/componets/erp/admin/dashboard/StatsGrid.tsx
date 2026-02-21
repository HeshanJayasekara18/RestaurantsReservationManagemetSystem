'use client';

import { ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingBag, Utensils, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';

interface StatsGridProps {
  stats: {
    revenue: number;
    totalOrders: number;
    reservationsToday: number;
    totalCustomers: number;
  };
}

export function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    {
      title: 'Total Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      change: '+12%', // Mock trend for now
      trend: 'up',
      icon: DollarSign,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      change: '+4',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Reservations Today',
      value: stats.reservationsToday.toString(),
      change: '0',
      trend: 'neutral',
      icon: Calendar,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toString(),
      change: '+5%',
      trend: 'up',
      icon: Users,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat, i) => (
        <Card key={i} className="hover:border-foreground/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {stat.trend === 'up' ? (
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              ) : stat.trend === 'down' ? (
                <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
              ) : null}
              <span className={stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : ''}>
                {stat.change}
              </span>
              <span className="ml-1">from yesterday</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
