'use client';

import { 
  Users, 
  Armchair, 
  Info,
  Clock,
  CircleDashed,
  CircleCheck,
  CircleAlert
} from 'lucide-react';
import { Badge } from '@/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/ui/hover-card';
import { cn } from '@/lib/utils';
import { DiningTable, Reservation } from '@/lib/types';
import { format } from 'date-fns';

// Extended type for display
export type TableStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE';

export interface TableNodeProps {
  table: DiningTable;
  status: TableStatus;
  currentReservation?: Reservation;
  onClick?: () => void;
}

const statusColors: Record<TableStatus, string> = {
  AVAILABLE: 'bg-green-500 hover:bg-green-600 border-green-600',
  OCCUPIED: 'bg-destructive hover:bg-destructive/90 border-destructive',
  RESERVED: 'bg-amber-500 hover:bg-amber-600 border-amber-600',
  MAINTENANCE: 'bg-gray-500 hover:bg-gray-600 border-gray-600',
};

const statusIcon: Record<TableStatus, any> = {
    AVAILABLE: CircleCheck,
    OCCUPIED: Users,
    RESERVED: Clock,
    MAINTENANCE: CircleAlert,
};

export function TableNode({ table, status, currentReservation, onClick }: TableNodeProps) {
  const Icon = statusIcon[status];
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div 
          onClick={onClick}
          className={cn(
            "relative cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-md flex flex-col items-center justify-center border-2",
            statusColors[status],
            // Visual Shape: Round vs Rect based on capacity or generic
            table.capacity >= 6 ? "rounded-2xl w-32 h-24" : "rounded-lg w-24 h-24", // Rectangle for large tables
             // Use rounded-full for small ones if we want rounds? Let's stick to rounded-lg for consistecy unless capacity suggests round
             table.location?.includes('Private') ? "rounded-[2rem]" : ""
          )}
        >
          {/* Table Surface */}
          <div className="absolute inset-2 border border-white/20 rounded-md flex items-center justify-center">
             <span className="text-white font-bold text-xl drop-shadow-md">{table.tableNumber}</span>
          </div>

          {/* Chairs Indicator (Visual Only) */}
          <div className="absolute -bottom-1 flex gap-1">
             {Array.from({ length: Math.min(table.capacity, 4) }).map((_, i) => (
               <div key={i} className="w-4 h-1 bg-black/20 rounded-full" />
             ))}
          </div>

          {/* Status Icon Badge */}
          <div className="absolute -top-2 -right-2 bg-background rounded-full p-1 shadow-sm border border-border">
            <Icon className={cn("h-3 w-3", 
                status === 'AVAILABLE' ? 'text-green-500' : 
                status === 'OCCUPIED' ? 'text-destructive' : 
                status === 'RESERVED' ? 'text-amber-500' : 'text-gray-500'
            )} />
          </div>
        </div>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-80 p-0 overflow-hidden border-border bg-popover text-popover-foreground">
        <div className={cn("h-2 w-full", statusColors[status])} />
        <div className="p-4 space-y-3">
             <div className="flex justify-between items-start">
                 <div>
                    <h4 className="text-lg font-bold flex items-center gap-2">
                        Table {table.tableNumber}
                        <Badge variant="outline" className="text-[10px] h-5">{table.location}</Badge>
                    </h4>
                    <p className="text-sm text-muted-foreground">{table.capacity} Seats • {status}</p>
                 </div>
             </div>
             
             {currentReservation && (
                 <div className="bg-muted/50 p-3 rounded-md text-sm space-y-1">
                     <p className="font-medium text-foreground">Current Reservation</p>
                     <p className="text-muted-foreground flex items-center gap-2">
                        <Users className="h-3 w-3" /> {currentReservation.customer?.firstName} {currentReservation.customer?.lastName}
                     </p>
                     <p className="text-muted-foreground flex items-center gap-2">
                        <Clock className="h-3 w-3" /> {currentReservation.startTime} - {currentReservation.endTime ?? 'Unknown'}
                     </p>
                 </div>
             )}
             
             {!currentReservation && status === 'AVAILABLE' && (
                 <p className="text-sm text-green-600 flex items-center gap-2">
                     <CircleCheck className="h-4 w-4" /> Ready for guests
                 </p>
             )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
