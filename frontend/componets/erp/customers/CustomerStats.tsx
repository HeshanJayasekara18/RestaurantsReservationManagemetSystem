'use client';

import { Users, UserPlus, Trophy, ExternalLink, TrendingUp, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/ui/card';
import { Button } from '@/ui/button';
import { Customer } from '@/lib/types';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface CustomerStatsProps {
  customers: Customer[];
  onSendBulkOffer: () => void;
}

export function CustomerStats({ customers, onSendBulkOffer }: CustomerStatsProps) {
  const total = customers.length;
  // Mock logic assuming mock data is recent for "new this month"
  const newThisMonth = customers.filter(c => {
      const date = new Date(c.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;
  
  const highValue = customers.filter(c => c.loyaltyPoints > 200).length;

  const data = [
      { name: 'Mon', newCustomers: 4 },
      { name: 'Tue', newCustomers: 3 },
      { name: 'Wed', newCustomers: 7 },
      { name: 'Thu', newCustomers: 2 },
      { name: 'Fri', newCustomers: 6 },
      { name: 'Sat', newCustomers: 8 },
      { name: 'Sun', newCustomers: 5 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{total}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Members</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{newThisMonth}</div>
                <p className="text-xs text-muted-foreground">Joined this month</p>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loyal Customers</CardTitle>
                <Trophy className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{highValue}</div>
                <p className="text-xs text-muted-foreground">Points &gt; 200</p>
            </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
             <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium text-primary">Marketing Action</CardTitle>
                 <CardDescription className="text-xs">Send offer to top customers</CardDescription>
             </CardHeader>
             <CardContent>
                 <Button size="sm" className="w-full bg-primary" onClick={onSendBulkOffer}>
                     <Gift className="h-3 w-3 mr-2" /> Send Offer
                 </Button>
             </CardContent>
        </Card>

        {/* Mini Chart - Spanning 2 columns on large screens if desired, but sticking to grid for now. 
            Actually, let's put a chart in a separate row or specific card if needed. 
            For now, simpler stats are better suited for top row. 
        */}
    </div>
  );
}
