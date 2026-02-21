'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/ui/card';
import { Badge } from '@/ui/badge';

interface Order {
  id: number;
  customer: string;
  amount: number;
  status: string;
}

interface RecentOrdersTableProps {
  orders: Order[];
}

const statusStyles: Record<string, string> = {
  CONFIRMED: 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20',
  PENDING: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20',
  PROCESSING: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20',
  CANCELLED: 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20',
};

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <Card className="col-span-4 lg:col-span-3 bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Recent Orders</CardTitle>
        <CardDescription className="text-muted-foreground">Latest reservations and orders.</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
            <p className="text-muted-foreground text-sm">No recent orders found.</p>
        ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-9 w-9 bg-muted border border-border">
                  <AvatarFallback className="bg-muted text-amber-500">
                    {order.customer.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground leading-none">{order.customer}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                  {/* <div className="font-medium text-foreground hidden sm:block">${order.amount}</div> */}
                  <Badge variant="outline" className={`${statusStyles[order.status] || 'bg-gray-500/10 text-gray-500'} border`}>
                    {order.status}
                  </Badge>
              </div>
            </div>
          ))}
        </div>
        )}
      </CardContent>
    </Card>
  );
}
