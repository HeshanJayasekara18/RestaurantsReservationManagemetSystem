'use client';

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'; // Added CartesianGrid
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/ui/card';
import { Button } from '@/ui/button';
import { ArrowUpRight } from 'lucide-react';

const data = [
  { time: '10am', revenue: 400 },
  { time: '11am', revenue: 300 },
  { time: '12pm', revenue: 850 },
  { time: '1pm', revenue: 1200 },
  { time: '2pm', revenue: 900 },
  { time: '3pm', revenue: 600 },
  { time: '4pm', revenue: 450 },
  { time: '5pm', revenue: 700 },
  { time: '6pm', revenue: 1100 },
  { time: '7pm', revenue: 1400 },
  { time: '8pm', revenue: 1350 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-4 lg:col-span-3 bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
           <CardTitle className="text-card-foreground">Revenue Trends</CardTitle>
           <CardDescription className="text-muted-foreground">Hourly sales performance today</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="hidden sm:flex border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground">
          View Report <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pl-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                stroke="#888888" 
                tickLine={false} 
                axisLine={false}
                fontSize={12}
              />
              <YAxis 
                stroke="#888888" 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                fontSize={12}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--popover-foreground))', borderRadius: 'var(--radius)' }}
                itemStyle={{ color: '#f59e0b' }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
