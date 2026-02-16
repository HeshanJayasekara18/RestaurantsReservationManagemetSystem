"use client";

import { useEffect, useState } from "react";
import { HeroVisual } from "../../common/ui/hero-visual";
import { ScrollIndicator } from "../../common/ui/scroll-indicator";
import { FloatingParticles } from "../../common/ui/floating-particles";
import { ArrowRight, Utensils } from "lucide-react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-zinc-950">
      {/* Background ambient effects */}
      <div
        className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-amber-500/3 blur-[100px]"
        aria-hidden="true"
      />

      <FloatingParticles />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-32 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-0">
        {/* Left: Text content */}
        <div className="flex flex-col gap-8">
          {/* Badge */}
          <div
            className={`transition-all duration-700 ${
              mounted
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-2">
              <Utensils className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-xs tracking-widest text-amber-500 uppercase">
                Smart Dining Redefined
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1
            className={`font-serif text-5xl leading-[1.1] tracking-tight text-white transition-all duration-700 delay-100 md:text-6xl lg:text-7xl ${
              mounted
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <span className="text-balance">
              Where Culinary Art Meets{" "}
              <span className="text-amber-500">Elegance</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`max-w-lg text-lg leading-relaxed text-gray-300 transition-all duration-700 delay-200 ${
              mounted
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            Effortless reservations, curated tasting menus, and an ambiance
            designed for unforgettable evenings. Welcome to the future of fine
            dining.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 ${
              mounted
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <a
              href="#reservations"
              className="group inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-sm font-semibold tracking-wide text-black transition-all duration-300 hover:gap-3 hover:shadow-lg hover:shadow-amber-500/25 hover:bg-amber-400"
            >
              Reserve a Table
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-transparent px-8 py-4 text-sm font-medium tracking-wide text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/10"
            >
              Explore Menu
            </a>
          </div>

          {/* Social proof */}
          <div
            className={`flex items-center gap-6 transition-all duration-700 delay-500 ${
              mounted
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {[
                "bg-amber-500/70",
                "bg-amber-500/50",
                "bg-amber-500/30",
                "bg-gray-700",
              ].map((bg, i) => (
                <div
                  key={i}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-950 text-[10px] font-medium text-white ${bg}`}
                >
                  {["JD", "AL", "MK", "RS"][i]}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {"2,400+ reservations"}
              </p>
              <p className="text-xs text-gray-400">this month alone</p>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <HeroVisual />
      </div>

      <ScrollIndicator />
    </section>
  );
}
