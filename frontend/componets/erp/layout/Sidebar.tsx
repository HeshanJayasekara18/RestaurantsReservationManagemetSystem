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
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth.store';
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
];

export function Sidebar() {
  const pathname = usePathname();
  const role = useAuthStore((s) => s.role);

  const visible = navItems.filter(
    (item) => role && item.roles.includes(role)
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-gray-950 border-r border-gray-800">
      {/* Brand */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-800">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
          <ChefHat className="h-5 w-5 text-gray-950" />
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-none">Savor House</p>
          <p className="text-xs text-gray-500 mt-0.5">ERP Dashboard</p>
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
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                active
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              )}
            >
              <item.icon className={cn('h-4 w-4 shrink-0', active ? 'text-amber-400' : '')} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Role badge at bottom */}
      <div className="px-4 py-3 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-gray-500">
            Logged in as <span className="text-amber-400 font-medium">{role}</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
