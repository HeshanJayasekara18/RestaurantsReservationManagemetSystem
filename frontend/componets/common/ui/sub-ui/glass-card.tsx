import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
