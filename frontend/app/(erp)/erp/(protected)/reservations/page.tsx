'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { reservationsApi } from '@/lib/api';
import { Reservation } from '@/lib/types';
import { Button } from '@/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/ui/card';
import { Badge } from '@/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await reservationsApi.list();
      setReservations(res.data);
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
      toast.error('Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await reservationsApi.update(id, { status });
      toast.success(`Reservation ${status.toLowerCase()}`);
      fetchReservations();
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update reservation status');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this reservation?')) return;
    try {
      await reservationsApi.remove(id);
      toast.success('Reservation deleted');
      fetchReservations();
    } catch (error) {
      console.error('Failed to delete reservation:', error);
      toast.error('Failed to delete reservation');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>;
      case 'CANCELLED':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline" className="text-gray-500 border-gray-500">Completed</Badge>;
      default:
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
          <p className="text-muted-foreground">
            Manage upcoming bookings and walk-ins.
          </p>
        </div>
        <Button onClick={() => fetchReservations()}>Refresh</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            View and manage all reservation requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wait #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                    No reservations found.
                  </TableCell>
                </TableRow>
              ) : (
                reservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">#{reservation.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {reservation.customer 
                            ? `${reservation.customer.firstName} ${reservation.customer.lastName}`
                            : 'Unknown Customer'}
                        </span>
                        <span className="text-xs text-muted-foreground">{reservation.customer?.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {format(new Date(reservation.reservationDate), 'MMM d, yyyy')}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(reservation.startTime), 'h:mm a')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{reservation.guestCount} ppl</TableCell>
                    <TableCell>
                      {reservation.table 
                        ? `Table ${reservation.table.tableNumber}`
                        : 'Unassigned'}
                    </TableCell>
                    <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(reservation.id, 'CONFIRMED')}>
                            Confirm Booking
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(reservation.id, 'CANCELLED')}>
                            Cancel Booking
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(reservation.id, 'COMPLETED')}>
                            Mark Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(reservation.id)}>
                            Delete Record
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
