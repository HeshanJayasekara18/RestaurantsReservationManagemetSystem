'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Search, Plus, Filter, Armchair, Users, LayoutGrid } from 'lucide-react';
import { TableNode, TableStatus } from './TableNode';
import { DiningTable, Reservation } from '@/lib/types'; // Assuming types exist

// Mock Data Generator
const mockTables: (DiningTable & { status: TableStatus; currentReservation?: Reservation })[] = [
    // Main Hall
    ...Array.from({ length: 12 }).map((_, i) => ({
        id: i + 1,
        restaurantId: 1,
        tableNumber: 1 + i,
        capacity: i % 3 === 0 ? 6 : 4,
        location: 'Main Hall',
        isActive: true,
        status: (i === 1 || i === 5 ? 'OCCUPIED' : i === 3 ? 'RESERVED' : 'AVAILABLE') as TableStatus,
        currentReservation: i === 1 ? {
            id: 101,
            customer: { firstName: 'John', lastName: 'Doe' } as any,
            startTime: '19:00',
            endTime: '21:00',
            guestCount: 4,
        } as any : undefined
    })),
    // Patio
    ...Array.from({ length: 8 }).map((_, i) => ({
        id: 20 + i,
        restaurantId: 1,
        tableNumber: 20 + i,
        capacity: 2,
        location: 'Patio',
        isActive: true,
        status: (i < 3 ? 'OCCUPIED' : 'AVAILABLE') as TableStatus,
    })),
    // Private
    ...Array.from({ length: 3 }).map((_, i) => ({
        id: 50 + i,
        restaurantId: 1,
        tableNumber: 50 + i,
        capacity: 8,
        location: 'Private Room',
        isActive: true,
        status: 'RESERVED' as TableStatus,
         currentReservation: {
            id: 102,
            customer: { firstName: 'VIP', lastName: 'Guest' } as any,
            startTime: '20:00',
            endTime: '23:00',
            guestCount: 8,
        } as any
    })),
];

export function TablesView() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeLocation, setActiveLocation] = useState('ALL');

    const filteredTables = mockTables.filter(table => {
        const matchesSearch = table.tableNumber.toString().includes(searchTerm) || table.location?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = activeLocation === 'ALL' || table.location === activeLocation;
        return matchesSearch && matchesLocation;
    });

    const locations = ['ALL', 'Main Hall', 'Patio', 'Private Room'];

    // Stats
    const total = mockTables.length;
    const available = mockTables.filter(t => t.status === 'AVAILABLE').length;
    const occupied = mockTables.filter(t => t.status === 'OCCUPIED').length;

    return (
        <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">Floor Plan</h2>
                  <p className="text-muted-foreground text-sm">Real-time table status and availability.</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-md border border-border">
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">{available} Available</Badge>
                        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">{occupied} Occupied</Badge>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">{total - available - occupied} Reserved</Badge>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" /> Add Table
                    </Button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between shrink-0">
                <Tabs value={activeLocation} onValueChange={setActiveLocation} className="w-full sm:w-auto">
                    <TabsList>
                        {locations.map(loc => (
                            <TabsTrigger key={loc} value={loc}>{loc}</TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
                
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Find table..." 
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Visual Floor Plan */}
            <Card className="flex-1 overflow-hidden border-border bg-card/50 backdrop-blur-sm relative flex flex-col">
                 <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <div className="p-2 bg-background/80 backdrop-blur rounded-md border border-border shadow-sm text-xs space-y-1">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" /> Available</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive" /> Occupied</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500" /> Reserved</div>
                    </div>
                 </div>

                 <div className="flex-1 overflow-auto p-8 bg-grid-slate-900/[0.04] dark:bg-grid-slate-400/[0.05]">
                    {/* Render Tables Grouped by Zone if ALL, or just the zone */}
                    
                    <div className="flex flex-wrap gap-12 justify-center content-start min-h-full">
                         {filteredTables.map((table) => (
                             <TableNode 
                                key={table.id} 
                                table={table} 
                                status={table.status} 
                                currentReservation={table.currentReservation}
                             />
                         ))}
                    </div>
                 </div>
            </Card>
        </div>
    );
}
