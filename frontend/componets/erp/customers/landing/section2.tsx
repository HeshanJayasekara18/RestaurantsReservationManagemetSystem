"use client";

import { useEffect, useState, useRef } from "react";
import { UtensilsCrossed, CalendarClock, ChefHat, Sparkles } from "lucide-react";
import { FloatingParticles } from "../../../common/ui/floating-particles";

const features = [
  {
    icon: <CalendarClock className="h-6 w-6" />,
    title: "Seamless Reservations",
    description: "Book your table in seconds. Real-time availability ensures your perfect dining slot is always just a click away.",
  },
  {
    icon: <ChefHat className="h-6 w-6" />,
    title: "Masterful Chefs",
    description: "Our award-winning culinary team crafts every dish with passion, using only the finest locally-sourced ingredients.",
  },
  {
    icon: <UtensilsCrossed className="h-6 w-6" />,
    title: "Curated Menus",
    description: "From seasonal tasting menus to timeless classics, explore a diverse selection designed to tantalize your palate.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Premium Ambiance",
    description: "Immerse yourself in an atmosphere of refined elegance. Every detail is curated for an unforgettable experience.",
  },
];

export function Section2() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background py-24"
    >
      {/* Background accents */}
      <div 
        className="absolute top-0 left-1/4 hidden dark:block h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-amber-500/5 blur-[120px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 right-1/4 hidden dark:block h-[500px] w-[500px] translate-x-1/2 rounded-full bg-zinc-800/10 blur-[100px]" 
        aria-hidden="true" 
      />

      <FloatingParticles />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h2 className="text-sm font-semibold tracking-widest text-amber-500 uppercase">
              The Experience
            </h2>
            <p className="mt-4 font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Elevating Every Moment
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We believe dining is more than just a meal; it's a symphony of flavors, exceptional service, and an atmosphere that lingers in your memory.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-xl grid-cols-1 gap-8 sm:mt-24 lg:max-w-none lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative flex flex-col rounded-3xl bg-card p-8 shadow-2xl ring-1 ring-border transition-all duration-1000 hover:bg-accent/50 hover:ring-primary/30 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Feature Icon Background Glow */}
              <div className="absolute inset-0 z-0 hidden rounded-3xl bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block" />
              
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20 transition-transform duration-500 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-zinc-950">
                {feature.icon}
              </div>
              
              <h3 className="relative z-10 mt-6 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              
              <p className="relative z-10 mt-4 leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
