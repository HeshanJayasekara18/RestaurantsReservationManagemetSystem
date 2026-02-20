'use client';

import { format } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle,
  Phone,
  Mail
} from 'lucide-react';
import { Reservation, ReservationStatus } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ReservationCardProps {
  reservation: Reservation;
  onStatusChange: (id: number, status: ReservationStatus) => void;
}

const statusColor: Record<ReservationStatus, string> = {
  PENDING: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  CONFIRMED: 'bg-green-500/10 text-green-500 border-green-500/20',
  CANCELLED: 'bg-destructive/10 text-destructive border-destructive/20',
  COMPLETED: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
};

export function ReservationCard({ reservation, onStatusChange }: ReservationCardProps) {
  const status = reservation.status;
  const customerName = reservation.customer 
    ? `${reservation.customer.firstName} ${reservation.customer.lastName}`
    : 'Unknown Customer';
    
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 bg-card/50 backdrop-blur-sm border-border">
      {/* Status Stripe */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1 transition-colors",
        status === 'CONFIRMED' ? 'bg-green-500' :
        status === 'PENDING' ? 'bg-amber-500' :
        status === 'CANCELLED' ? 'bg-destructive' : 'bg-blue-500'
      )} />

      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 pl-5">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customerName}`} />
            <AvatarFallback>{customerName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground leading-none">{customerName}</h3>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {reservation.customer?.mobileNumber}</span>
            </p>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onStatusChange(reservation.id, 'CONFIRMED')}>
              Mark Confirmed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(reservation.id, 'COMPLETED')}>
              Mark Completed
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onStatusChange(reservation.id, 'CANCELLED')}>
              Cancel Reservation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent className="pl-5 pt-2">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary/70" />
            <span>{format(new Date(reservation.reservationDate), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary/70" />
            <span>{reservation.startTime}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-primary/70" />
            <span>{reservation.guestCount} Guests</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary/70" />
            <span>Table {reservation.table?.tableNumber ?? 'N/A'}</span>
          </div>
        </div>
        
        {reservation.specialRequest && (
            <div className="mt-4 p-2.5 rounded-md bg-muted/50 border border-border text-xs text-muted-foreground italic">
                "{reservation.specialRequest}"
            </div>
        )}
      </CardContent>

      <CardFooter className="pl-5 pt-0 pb-4 flex justify-between items-center bg-muted/20 mt-2 py-3">
        <Badge variant="outline" className={cn("font-normal", statusColor[status])}>
          {status}
        </Badge>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {status === 'PENDING' && (
                <>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-green-500 hover:text-green-600 hover:bg-green-500/10" onClick={() => onStatusChange(reservation.id, 'CONFIRMED')} title="Confirm">
                        <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => onStatusChange(reservation.id, 'CANCELLED')} title="Decline">
                        <XCircle className="h-4 w-4" />
                    </Button>
                </>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
