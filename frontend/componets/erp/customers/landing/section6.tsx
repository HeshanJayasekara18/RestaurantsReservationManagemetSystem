"use client";

import { useEffect, useState, useRef } from "react";
import { Send, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { FloatingParticles } from "../../../common/ui/floating-particles";

export function Section6() {
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
      className="relative flex min-h-[60vh] items-center py-24 overflow-hidden bg-background border-t border-border"
      id="contact"
    >
      {/* Background accents */}
      <div 
        className="absolute top-0 right-1/4 hidden dark:block h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[120px]" 
        aria-hidden="true" 
      />

      <FloatingParticles />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Left: Newsletter Subscription */}
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <h2 className="text-sm font-semibold tracking-widest text-amber-500 uppercase">
              Stay Connected
            </h2>
            <p className="mt-4 font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
              Join Our Inner <span className="text-primary">Circle</span>
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-lg">
              Subscribe to receive exclusive invitations to tasting events, seasonal menu previews, and culinary insights from our head chef.
            </p>
            
            <form className="mt-10 flex max-w-md gap-x-4" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="min-w-0 flex-auto rounded-full border-0 bg-muted/50 px-6 py-4 text-foreground shadow-sm ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
              >
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </button>
            </form>
          </div>

          {/* Right: Contact Info & Socials */}
          <div 
            className={`grid grid-cols-1 gap-12 sm:grid-cols-2 transition-all duration-1000 delay-300 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-semibold text-foreground">Visit Us</h3>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                <p>123 Gastronomy Lane,<br />Culinary District, NY 10001</p>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <p>hello@restaurant.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-semibold text-foreground">Follow Our Journey</h3>
              <p className="text-muted-foreground">
                Get a behind-the-scenes look at our kitchen and upcoming specials.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                  { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
                  { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground ring-1 ring-border transition-all hover:bg-primary hover:text-primary-foreground hover:ring-primary"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
