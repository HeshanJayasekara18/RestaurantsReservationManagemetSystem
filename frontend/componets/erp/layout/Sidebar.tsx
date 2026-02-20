'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  UtensilsCrossed,
  Users,
  TableIcon,
  UserCog,
  ChefHat,
  BarChart3,
  Shield,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth.store';
import { useSidebarStore } from '@/lib/store/sidebar.store';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'Dashboard',
    href: '/erp/dashboard',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'MANAGER', 'WAITER', 'KITCHEN'],
  },
  {
    label: 'Reservations',
    href: '/erp/reservations',
    icon: CalendarCheck,
    roles: ['ADMIN', 'MANAGER', 'WAITER'],
  },
  {
    label: 'Tables',
    href: '/erp/tables',
    icon: TableIcon,
    roles: ['ADMIN', 'MANAGER'],
  },
  {
    label: 'Menu',
    href: '/erp/menu',
    icon: UtensilsCrossed,
    roles: ['ADMIN', 'MANAGER', 'KITCHEN'],
  },
  {
    label: 'Customers',
    href: '/erp/customers',
    icon: Users,
    roles: ['ADMIN', 'MANAGER'],
  },
  {
    label: 'Staff',
    href: '/erp/staff',
    icon: UserCog,
    roles: ['ADMIN'],
  },
  {
    label: 'Reports',
    href: '/erp/reports',
    icon: BarChart3,
    roles: ['ADMIN', 'MANAGER'],
  },
  {
    label: 'Roles & Permissions',
    href: '/erp/roles',
    icon: Shield,
    roles: ['ADMIN'],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const role = useAuthStore((s) => s.role);
  const isOpen = useSidebarStore((s) => s.isOpen);

  const visible = navItems.filter(
    (item) => role && item.roles.includes(role)
  );

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border text-sidebar-foreground transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap",
      isOpen ? "w-60 translate-x-0" : "w-0 -translate-x-full opacity-0"
    )}>
      {/* Brand */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <ChefHat className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold leading-none">Savor House</p>
          <p className="text-xs text-muted-foreground mt-0.5">ERP Dashboard</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {visible.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className={cn('h-4 w-4 shrink-0', active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Role badge at bottom */}
      <div className="px-4 py-3 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">
            Logged in as <span className="font-medium text-foreground">{role}</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
