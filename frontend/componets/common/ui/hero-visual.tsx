"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GlassCard } from "./sub-ui/glass-card";
import { Star, Clock, Users } from "lucide-react";

export function HeroVisual() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`relative transition-all duration-1000 delay-300 ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {/* Glow behind the image */}
      <div className="absolute -inset-8 rounded-3xl bg-primary/10 blur-3xl animate-glow-pulse" />

      {/* Main image container */}
      <div className="relative overflow-hidden rounded-2xl border border-border/30 shadow-2xl shadow-primary/10">
        <Image
          src="/images/restaurant-interior.jpg"
          alt="Savra restaurant interior with warm ambient lighting and elegant fine dining setup"
          width={700}
          height={500}
          className="h-auto w-full object-cover"
          priority
        />

        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        {/* Floating glass UI elements */}
        <GlassCard className="absolute top-6 right-6 flex items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-semibold text-foreground">4.9</span>
          </div>
          <span className="text-xs text-muted-foreground">Michelin Guide</span>
        </GlassCard>

        <GlassCard className="absolute bottom-6 left-6 flex items-center gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs font-medium text-foreground">Next Available</p>
              <p className="text-xs text-muted-foreground">Tonight, 8:30 PM</p>
            </div>
          </div>
          <div className="h-8 w-px bg-border/50" />
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs font-medium text-foreground">Party of 2</p>
              <p className="text-xs text-muted-foreground">Window seat</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
