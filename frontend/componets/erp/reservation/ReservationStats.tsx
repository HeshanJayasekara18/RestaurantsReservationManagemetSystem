'use client';

import { Reservation, ReservationStatus } from '@/lib/types';
import { Card, CardContent } from '@/ui/card';
import { CheckCircle2, Clock, XCircle, Users } from 'lucide-react';

interface ReservationStatsProps {
  reservations: Reservation[];
}

export function ReservationStats({ reservations }: ReservationStatsProps) {
  const total = reservations.length;
  const confirmed = reservations.filter(r => r.status === 'CONFIRMED').length;
  const pending = reservations.filter(r => r.status === 'PENDING').length;
  const cancelled = reservations.filter(r => r.status === 'CANCELLED').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        label="Total Reservations" 
        value={total} 
        icon={Users} 
        className="border-l-4 border-l-primary"
      />
      <StatCard 
        label="Confirmed" 
        value={confirmed} 
        icon={CheckCircle2} 
        className="border-l-4 border-l-green-500"
        iconColor="text-green-500"
      />
      <StatCard 
        label="Pending" 
        value={pending} 
        icon={Clock} 
        className="border-l-4 border-l-amber-500"
        iconColor="text-amber-500"
      />
      <StatCard 
        label="Cancelled" 
        value={cancelled} 
        icon={XCircle} 
        className="border-l-4 border-l-destructive"
        iconColor="text-destructive"
      />
    </div>
  );
}

function StatCard({ label, value, icon: Icon, className, iconColor = "text-primary" }: any) {
  return (
    <Card className={`bg-card border-border shadow-sm ${className}`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase font-medium tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-muted/50 ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
