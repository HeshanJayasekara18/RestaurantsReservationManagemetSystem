'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Bell, PanelLeft } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth.store';
import { useSidebarStore } from '@/lib/store/sidebar.store';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { ModeToggle } from '@/componets/common/ui/mode-toggle';
import { cn } from '@/lib/utils';

const roleBadgeColor: Record<string, string> = {
  ADMIN:   'bg-red-500/20 text-red-400 border-red-500/30',
  MANAGER: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  WAITER:  'bg-green-500/20 text-green-400 border-green-500/30',
  KITCHEN: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

export function Topbar() {
  const router = useRouter();
  const { user, role, logout } = useAuthStore();
  const { isOpen, toggle } = useSidebarStore();

  const handleLogout = () => {
    logout();
    router.push('/erp/login');
  };

  const displayName = user?.name ?? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() ?? 'Staff';
  const userRole = role ?? 'STAFF';

  return (
    <header className={cn(
      "fixed top-0 right-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6 transition-all duration-300 ease-in-out",
      isOpen ? "left-60" : "left-0"
    )}>
      {/* Left — page context breadcrumb space */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggle} className="mr-2 h-8 w-8 text-muted-foreground">
          <PanelLeft className="h-4 w-4" />
        </Button>
        <div className="h-4 w-px bg-border hidden sm:block" />
        <span className="text-xs text-muted-foreground font-mono hidden sm:block">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Right — user info + actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted">
          <Bell className="h-4 w-4" />
        </Button>

        <ModeToggle />

        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-foreground">{displayName}</p>
          <div className="flex justify-end mt-0.5">
            <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0 border h-4 items-center flex font-normal uppercase', roleBadgeColor[userRole] || 'bg-muted text-muted-foreground border-border')}>
              {userRole}
            </Badge>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
