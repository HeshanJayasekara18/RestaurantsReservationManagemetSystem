"use client";

import { useState } from "react";
import { Star, Plus } from "lucide-react";
import { MenuItem } from "@/lib/types";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 ring-1 ring-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden">
        <div className="absolute inset-0 bg-muted animate-pulse" />
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground/30 font-serif italic">Fine Dining</span>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-primary/20 backdrop-blur-[2px] transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 rounded-full bg-background/90 backdrop-blur-md px-4 py-1.5 text-sm font-bold text-foreground shadow-lg">
          ${Number(item.price).toFixed(2)}
        </div>

        {/* Action Button */}
        <button className={`absolute bottom-4 right-4 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-all duration-500 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
            Signature
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="text-xs font-semibold text-foreground">4.5</span>
          </div>
        </div>
        
        <h3 className="font-serif text-xl font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
          {item.name}
        </h3>
        
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        {/* Tags or Additional info could go here */}
        <div className="mt-6 flex flex-wrap gap-2">
          {item.isAvailable ? (
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
              Available
            </span>
          ) : (
            <span className="text-[10px] bg-destructive/10 text-destructive px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
              Sold Out
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
