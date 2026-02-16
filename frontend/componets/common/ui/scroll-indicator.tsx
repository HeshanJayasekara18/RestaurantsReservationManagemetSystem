"use client";

import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
      <span className="text-[10px] tracking-[0.3em] text-muted-foreground/60 uppercase">
        Scroll to Explore
      </span>
      <div className="flex flex-col items-center gap-1 animate-bounce">
        <ChevronDown className="h-4 w-4 text-muted-foreground/40" />
      </div>
    </div>
  );
}
