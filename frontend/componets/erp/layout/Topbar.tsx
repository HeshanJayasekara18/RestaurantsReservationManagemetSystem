'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Bell } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth.store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const roleBadgeColor: Record<string, string> = {
  ADMIN:   'bg-red-500/20 text-red-400 border-red-500/30',
  MANAGER: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  WAITER:  'bg-green-500/20 text-green-400 border-green-500/30',
  KITCHEN: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

export function Topbar() {
  const router = useRouter();
  const { user, role, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/erp/login');
  };

  const displayName = user?.name ?? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() ?? 'Staff';

  return (
    <header className="fixed top-0 right-0 left-60 z-40 flex h-14 items-center justify-between border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm px-6">
      {/* Left — page context breadcrumb space */}
      <div className="flex items-center gap-3">
        <div className="h-4 w-px bg-gray-700" />
        <span className="text-xs text-gray-500 font-mono">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Right — user info + actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800">
          <Bell className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5">
          <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center text-xs font-bold text-gray-950">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-white">{displayName}</span>
          {role && (
            <span className={`text-xs px-1.5 py-0.5 rounded border font-medium ${roleBadgeColor[role] ?? ''}`}>
              {role}
            </span>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
