"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategoryId: number | null;
  onCategoryChange: (id: number | null) => void;
}

export function CategoryTabs({ categories, activeCategoryId, onCategoryChange }: CategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeTab = containerRef.current?.querySelector(`[data-id="${activeCategoryId ?? 'all'}"]`) as HTMLElement;
    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeCategoryId, categories]);

  return (
    <div className="sticky top-20 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div 
          ref={containerRef}
          className="relative flex items-center gap-8 overflow-x-auto no-scrollbar py-4"
        >
          <button
            data-id="all"
            onClick={() => onCategoryChange(null)}
            className={cn(
              "whitespace-nowrap text-sm font-medium tracking-widest uppercase transition-colors duration-300",
              activeCategoryId === null ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            All Dishes
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              data-id={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "whitespace-nowrap text-sm font-medium tracking-widest uppercase transition-colors duration-300",
                activeCategoryId === category.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {category.name}
            </button>
          ))}

          {/* Animated Indicator */}
          <div 
            className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out"
            style={{ 
              left: indicatorStyle.left, 
              width: indicatorStyle.width 
            }}
          />
        </div>
      </div>
    </div>
  );
}
