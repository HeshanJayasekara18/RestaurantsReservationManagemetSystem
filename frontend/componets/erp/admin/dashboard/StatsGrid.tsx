'use client';

import { ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingBag, Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';

const stats = [
  {
    title: 'Total Revenue',
    value: '$1,250.00',
    change: '+12%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    title: 'Active Orders',
    value: '12',
    change: '+4',
    trend: 'up',
    icon: ShoppingBag,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Reservations',
    value: '8',
    change: '-2',
    trend: 'down',
    icon: CalendarIcon, // Defined below to avoid conflict
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    title: 'Occupancy',
    value: '65%',
    change: '+5%',
    trend: 'up',
    icon: Users,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
];

function CalendarIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    )
}

export function StatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
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
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
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
