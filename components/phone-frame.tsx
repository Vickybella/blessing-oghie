import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-[9/19.5] w-full max-w-[260px]", className)}>
      <div className="absolute inset-0 rounded-[2.6rem] bg-[#0b0b10] shadow-[0_20px_50px_rgba(0,0,0,0.35)]" />
      <div className="absolute inset-[7px] overflow-hidden rounded-[2.25rem] bg-black">
        {children}
        <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      </div>
      <div className="absolute -right-[2px] top-24 h-14 w-[3px] rounded-l bg-[#0b0b10]" />
      <div className="absolute -left-[2px] top-20 h-8 w-[3px] rounded-r bg-[#0b0b10]" />
      <div className="absolute -left-[2px] top-32 h-8 w-[3px] rounded-r bg-[#0b0b10]" />
    </div>
  );
}
