'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Search, Filter, Calendar as CalendarIcon, SlidersHorizontal } from 'lucide-react';
import { Reservation, ReservationStatus } from '@/lib/types';
import { ReservationCard } from './ReservationCard';
import { ReservationStats } from './ReservationStats';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';

// Mock data generator for display purposes if backend is empty
const mockReservations: Reservation[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  restaurantId: 1,
  customerId: 100 + i,
  reservationDate: new Date().toISOString(),
  startTime: `${18 + (i % 4)}:00`,
  guestCount: 2 + (i % 6),
  status: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'][i % 4] as ReservationStatus,
  specialRequest: i % 3 === 0 ? "Anniversary celebration, window seat please." : undefined,
  createdAt: new Date().toISOString(),
  customer: {
    id: 100 + i,
    firstName: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'][i],
    lastName: ['Smith', 'Jones', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore'][i],
    email: `customer${i}@example.com`,
    mobileNumber: `555-010${i}`,
    loyaltyPoints: 50 + i * 10,
    createdAt: new Date().toISOString()
  },
  table: {
    id: 10 + i,
    restaurantId: 1,
    tableNumber: 101 + i,
    capacity: 4,
    location: i % 2 === 0 ? 'Window' : 'Center',
    isActive: true
  }
}));

export function ReservationsView() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);

  const handleStatusChange = (id: number, newStatus: ReservationStatus) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const filteredReservations = reservations.filter(r => {
    const matchesTab = activeTab === 'ALL' || r.status === activeTab;
    const matchesSearch = 
      r.customer?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.customer?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toString().includes(searchTerm);
      
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Reservations</h2>
          <p className="text-muted-foreground text-sm">Manage bookings and tables.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
           <Button variant="outline" className="hidden md:flex gap-2">
             <CalendarIcon className="h-4 w-4" />
             {format(new Date(), 'MMM dd, yyyy')}
           </Button>
           <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
             + New Reservation
           </Button>
        </div>
      </div>

      <ReservationStats reservations={reservations} />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/40 p-1 rounded-lg border border-border/50">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-4 sm:flex sm:w-auto">
            <TabsTrigger value="ALL">All</TabsTrigger>
            <TabsTrigger value="PENDING">Pending</TabsTrigger>
            <TabsTrigger value="CONFIRMED">Confirmed</TabsTrigger>
            <TabsTrigger value="COMPLETED">History</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search guest or ID..." 
              className="pl-9 bg-background" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredReservations.map((reservation) => (
          <ReservationCard 
            key={reservation.id} 
            reservation={reservation} 
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
      
      {filteredReservations.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
              <p>No reservations found.</p>
          </div>
      )}
    </div>
  );
}
