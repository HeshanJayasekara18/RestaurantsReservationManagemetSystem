'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Progress } from '@/ui/progress';

interface OccupancyCardProps {
  occupancy: {
    occupied: number;
    total: number;
  };
}

export function OccupancyCard({ occupancy }: OccupancyCardProps) {
  const percentage = occupancy.total > 0 
    ? Math.round((occupancy.occupied / occupancy.total) * 100) 
    : 0;

  return (
    <Card className="col-span-4 lg:col-span-1 bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground text-lg">Table Occupancy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Detailed breakdown can be re-enabled when backend supports zones */}
          {/* <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Main Hall</span>
              <span className="text-foreground font-medium">85%</span>
            </div>
            <Progress value={85} className="h-2 bg-secondary" indicatorClassName="bg-amber-500" />
          </div> */}

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Capacity</span>
              <span className="text-foreground font-medium">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2 bg-secondary" indicatorClassName="bg-amber-500" />
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-2xl font-bold text-foreground">{occupancy.occupied}/{occupancy.total}</p>
                    <p className="text-xs text-muted-foreground">Seats/People Occupied</p>
                </div>
                <div className="h-10 w-10 text-xs flex items-center justify-center rounded-full border-2 border-amber-500 text-amber-500">
                    {percentage}%
                </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
