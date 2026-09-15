import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

const darkVars = {
  "--background": "#0a0a0d",
  "--surface": "#131317",
  "--surface-2": "#1c1c22",
  "--foreground": "#ffffff",
  "--muted": "#a6a4ad",
  "--muted-2": "#6f6d76",
  "--border": "rgba(255, 255, 255, 0.12)",
  "--border-strong": "rgba(255, 255, 255, 0.22)",
} as CSSProperties;

export function DarkZone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("dark-zone bg-background text-foreground", className)} style={darkVars}>
      {children}
    </div>
  );
}
