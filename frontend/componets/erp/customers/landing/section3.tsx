"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight, Star } from "lucide-react";
import { FloatingParticles } from "../../../common/ui/floating-particles";

const signatureDishes = [
  {
    id: 1,
    name: "Truffle Encrusted Wagyu",
    description: "A5 Japanese Wagyu beef, beautifully crusted with black truffle and served with a wild mushroom reduction.",
    price: "$145",
    image: "https://images.unsplash.com/photo-1544025162-8316eb52fcbc?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Pan-Seared Scallops",
    description: "Jumbo scallops seared to perfection, resting on a bed of sweet corn purée with crispy pancetta dust.",
    price: "$42",
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Golden Ora King Salmon",
    description: "Sustainably sourced salmon fillet, glazed with miso and accompanied by quick-pickled ginger and edamame.",
    price: "$58",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop",
  },
];

export function Section3() {
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
      className="relative flex min-h-screen items-center py-24 overflow-hidden bg-background"
      id="menu"
    >
      {/* Background accents */}
      <div 
        className="absolute top-1/2 left-1/2 hidden dark:block h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[150px]" 
        aria-hidden="true" 
      />

      <FloatingParticles />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div 
            className={`max-w-2xl transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h2 className="text-sm font-semibold tracking-widest text-amber-500 uppercase">
              Culinary Masterpieces
            </h2>
            <p className="mt-4 font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
              Signature Creations
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Each dish is a testament to our commitment to culinary excellence, blending traditional techniques with modern innovation.
            </p>
          </div>

          <div 
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <a
              href="#full-menu"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-6 py-3 text-sm font-medium tracking-wide text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              View Full Menu
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {signatureDishes.map((dish, index) => (
            <div
              key={dish.id}
              className={`group flex flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-border transition-all duration-700 hover:bg-accent/40 hover:ring-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ transitionDelay: `${400 + index * 200}ms` }}
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <div className="absolute inset-0 bg-muted animate-pulse" /> {/* Placeholder while loading */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-amber-500 text-amber-500 drop-shadow-md" />
                    ))}
                  </div>
                  <span className="rounded-full bg-amber-500/90 px-3 py-1 text-sm font-bold text-zinc-950 backdrop-blur-md">
                    {dish.price}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-serif text-2xl text-foreground transition-colors duration-300 group-hover:text-primary">
                    {dish.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {dish.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
