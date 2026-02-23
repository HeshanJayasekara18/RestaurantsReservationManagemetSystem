"use client";

import { useEffect, useState, useRef } from "react";
import { Quote, Star } from "lucide-react";
import { FloatingParticles } from "../../../common/ui/floating-particles";

const testimonials = [
  {
    id: 1,
    content: "An absolute masterpiece of a dining experience. The attention to detail in both the food and the service is unparalleled.",
    author: "Elena Rodriguez",
    role: "Food Critic, Gastronomy Weekly",
    rating: 5,
    avatar: "ER",
  },
  {
    id: 2,
    content: "The ambiance alone is worth the visit. But the truffle wagyu? That's something I'll be dreaming about for months.",
    author: "Marcus Chen",
    role: "Lifestyle Influencer",
    rating: 5,
    avatar: "MC",
  },
  {
    id: 3,
    content: "Finally, a reservation system that works as beautifully as the restaurant it represents. A seamless evening from start to finish.",
    author: "Sarah Jenkins",
    role: "Frequent Diner",
    rating: 5,
    avatar: "SJ",
  },
];

export function Section5() {
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
      id="testimonials"
    >
      {/* Background accents */}
      <div 
        className="absolute bottom-0 right-0 hidden dark:block h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[120px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-0 left-0 hidden dark:block h-[400px] w-[400px] rounded-full bg-zinc-800/20 blur-[100px]" 
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
              Guest Experiences
            </h2>
            <p className="mt-4 font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
              Voices of Excellence
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Don't just take our word for it. Here is what some of our distinguished guests have to say about their time with us.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`flex flex-col justify-between rounded-3xl bg-card p-8 shadow-2xl ring-1 ring-border transition-all duration-1000 hover:bg-accent/50 hover:ring-primary/30 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + index * 200}ms` }}
            >
              <div>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <div className="mt-8 relative">
                  <Quote className="absolute -top-4 -left-4 h-8 w-8 text-primary/20" />
                  <p className="relative z-10 text-lg italic leading-relaxed text-foreground/90">
                    "{testimonial.content}"
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/20">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
