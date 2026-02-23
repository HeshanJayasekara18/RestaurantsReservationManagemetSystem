"use client";

import { useEffect, useState } from "react";
import { FloatingParticles } from "../../../common/ui/floating-particles";

export function MenuHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex h-[60vh] items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] scale-110"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            transform: mounted ? "scale(1)" : "scale(1.1)"
          }}
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-transparent to-background" />
      </div>

      <FloatingParticles />

      <div className="relative z-10 text-center px-6">
        <div 
          className={`transition-all duration-1000 delay-300 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h1 className="font-serif text-5xl font-light tracking-tight text-foreground sm:text-7xl">
            A Symphony of <span className="text-primary italic">Flavors</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground/90 leading-relaxed">
            From our seasonal creations to timeless culinary classics, explore a menu 
            crafted with passion and the finest local ingredients.
          </p>
        </div>
      </div>

      {/* Aesthetic border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
    </section>
  );
}
