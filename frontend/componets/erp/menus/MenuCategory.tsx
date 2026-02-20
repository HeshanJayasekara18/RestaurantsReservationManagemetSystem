'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { LucideIcon } from 'lucide-react';

interface MenuCategoryProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function MenuCategory({ icon: Icon, label, isActive, onClick }: MenuCategoryProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 min-w-[100px] h-[100px] rounded-xl border transition-all duration-200 gap-3",
        isActive 
          ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105" 
          : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:bg-muted/50 hover:scale-105"
      )}
    >
      <div className={cn(
        "p-2 rounded-full",
        isActive ? "bg-white/20" : "bg-muted"
      )}>
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
