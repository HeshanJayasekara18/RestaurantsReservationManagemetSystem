'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth.store';
import { useSidebarStore } from '@/lib/store/sidebar.store';
import { Sidebar } from '@/componets/erp/layout/Sidebar';
import { Topbar } from '@/componets/erp/layout/Topbar';
import { Toaster } from '@/ui/sonner';
import { cn } from '@/lib/utils';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // Using a selector to avoid re-renders if other parts of store change, though auth store is small
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
  const isOpen = useSidebarStore((s) => s.isOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace('/erp/login');
    }
  }, [isAuthenticated, router, mounted]);

  if (!mounted) {
    return null; // or a generic loading skeleton that matches server
  }

  if (!isAuthenticated) {
     // ... render loading indicator
     return (
       <div className="flex h-screen items-center justify-center bg-gray-950">
         <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
       </div>
     );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <Topbar />
      {/* Main content pushed right of sidebar and below topbar */}
      <main className={cn(
        "pt-14 min-h-screen transition-all duration-300 ease-in-out",
        isOpen ? "ml-60" : "ml-0"
      )}>
        <div className="p-6">{children}</div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
