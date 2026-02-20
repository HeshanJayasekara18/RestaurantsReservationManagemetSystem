'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/ui/card';
import { Badge } from '@/ui/badge';

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'Alice Johnson',
    email: 'alice@example.com',
    amount: '$120.00',
    status: 'Completed',
    time: '2 mins ago',
    avatar: '/avatars/01.png',
    initials: 'AJ',
  },
  {
    id: 'ORD-002',
    customer: 'Bob Smith',
    email: 'bob@example.com',
    amount: '$45.50',
    status: 'Pending',
    time: '15 mins ago',
    avatar: '/avatars/02.png',
    initials: 'BS',
  },
  {
    id: 'ORD-003',
    customer: 'Charlie Brown',
    email: 'charlie@example.com',
    amount: '$230.00',
    status: 'Processing',
    time: '45 mins ago',
    avatar: '/avatars/03.png',
    initials: 'CB',
  },
  {
    id: 'ORD-004',
    customer: 'Diana Prince',
    email: 'diana@example.com',
    amount: '$89.00',
    status: 'Completed',
    time: '1 hour ago',
    avatar: '/avatars/04.png',
    initials: 'DP',
  },
    {
    id: 'ORD-005',
    customer: 'Ethan Hunt',
    email: 'ethan@example.com',
    amount: '$150.00',
    status: 'Cancelled',
    time: '2 hours ago',
    avatar: '/avatars/05.png',
    initials: 'EH',
  },
];

const statusStyles: Record<string, string> = {
  Completed: 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20',
  Pending: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20',
  Processing: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20',
  Cancelled: 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20',
};

export function RecentOrdersTable() {
  return (
    <Card className="col-span-4 lg:col-span-3 bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Recent Orders</CardTitle>
        <CardDescription className="text-muted-foreground">Latest dining and online orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-9 w-9 bg-muted border border-border">
                  <AvatarImage src={order.avatar} alt={order.customer} />
                  <AvatarFallback className="bg-muted text-amber-500">{order.initials}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground leading-none">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                  <div className="font-medium text-foreground hidden sm:block">{order.amount}</div>
                  <Badge variant="outline" className={`${statusStyles[order.status]} border`}>
                    {order.status}
                  </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
