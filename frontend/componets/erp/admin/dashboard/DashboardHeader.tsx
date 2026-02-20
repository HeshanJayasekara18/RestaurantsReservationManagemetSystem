'use client';

import { format } from 'date-fns';
import { useAuthStore } from '@/lib/store/auth.store';
import { Button } from '@/ui/button';
import { Bell, Calendar, Search } from 'lucide-react';
import { Input } from '@/ui/input';

export function DashboardHeader() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Good morning, {user?.name?.split(' ')[0] ?? 'Chef'}</h1>
        <p className="text-muted-foreground text-sm">
          {format(new Date(), 'EEEE, MMMM do, yyyy')} — Here's what's happening today.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="w-64 pl-9 bg-background border-input hover:bg-muted/50 focus:bg-background transition-colors" 
          />
        </div>
        <Button variant="outline" size="icon" className="border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted">
          <Calendar className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
