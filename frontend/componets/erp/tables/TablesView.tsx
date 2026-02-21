'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Input } from '@/ui/input';
import { Search } from 'lucide-react';
import { TableNode, TableStatus } from './TableNode';
import { DiningTable, Reservation } from '@/lib/types';
import { useTablesStore } from '@/lib/store/tablesStore';
import { AddTableDialog } from './AddTableDialog';

export function TablesView() {
    const { tables, activeReservations, fetchTables, fetchReservations, isLoading } = useTablesStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeLocation, setActiveLocation] = useState('ALL');

    useEffect(() => {
        const restaurantId = 1; // single-tenant setup
        fetchTables(restaurantId);
        fetchReservations(restaurantId);
    }, [fetchTables, fetchReservations]);

    // Enhance tables with real-time status based on active reservations
    const enhancedTables = tables.map((table) => {
        // Find if there's an ongoing reservation (very simplified logic for now)
        // In a real app we would check `reservationDate` and `startTime` vs `new Date()`
        const currentRes = activeReservations.find(r => r.tableId === table.id && r.status === 'CONFIRMED');
        
        // Simple logic: if there is any confirmed reservation today, mark as RESERVED (or OCCUPIED if time matches)
        // For demonstration, we'll mark as RESERVED if there's a reservation, else AVAILABLE
        let status: TableStatus = table.isActive ? 'AVAILABLE' : 'MAINTENANCE';
        if (currentRes) {
            status = 'RESERVED'; // Or OCCUPIED depending on time
        }

        return {
            ...table,
            status: status as TableStatus,
            currentReservation: currentRes
        };
    });

    const filteredTables = enhancedTables.filter(table => {
        const matchesSearch = table.tableNumber.toString().includes(searchTerm) || table.location?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = activeLocation === 'ALL' || table.location === activeLocation;
        return matchesSearch && matchesLocation;
    });

    // Dynamically get unique locations from tables
    const locations = ['ALL', ...Array.from(new Set(tables.map(t => t.location).filter(Boolean))) as string[]];

    // Stats
    const total = enhancedTables.length;
    const available = enhancedTables.filter(t => t.status === 'AVAILABLE').length;
    const occupied = enhancedTables.filter(t => t.status === 'OCCUPIED').length;

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
                    <AddTableDialog />
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
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            Loading tables...
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-12 justify-center content-start min-h-full">
                            {filteredTables.length === 0 ? (
                                <div className="text-center text-muted-foreground mt-20">
                                    No tables found. Add a table to get started.
                                </div>
                            ) : (
                                filteredTables.map((table) => (
                                    <TableNode 
                                        key={table.id} 
                                        table={table} 
                                        status={table.status} 
                                        currentReservation={table.currentReservation}
                                    />
                                ))
                            )}
                        </div>
                    )}
                 </div>
            </Card>
        </div>
    );
}
