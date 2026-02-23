"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Reservations", href: "#reservations" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="font-serif text-2xl tracking-wide text-foreground">
            Savra
          </span>
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href.startsWith("#") && pathname === "/");
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 hover:text-primary ${isActive ? "text-primary font-semibold" : "text-muted-foreground"
                  }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Desktop CTA */}
          <a
            href="#reservations"
            className="rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 text-sm font-medium tracking-wide text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            Book a Table
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 text-muted-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/30 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservations"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex justify-center rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 text-sm font-medium tracking-wide text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              Book a Table
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
