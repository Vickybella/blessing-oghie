"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServicesFull() {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <section id="services" className="border-b border-border px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-signal">
          Services
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Strategy first. Execution second.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Four pillars, ranked by what actually moves the needle.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative lg:contents">
            <div className="scrollbar-hide flex snap-x snap-proximity gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {services.map((svc, i) => (
                <button
                  key={svc.key}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex shrink-0 snap-start items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors lg:shrink",
                    i === active
                      ? "border-signal bg-signal/10"
                      : "border-border bg-surface hover:border-border-strong",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      i === active ? "bg-signal text-white" : "bg-background text-signal",
                    )}
                  >
                    <svc.icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0">
                    <span className="block whitespace-nowrap font-display text-sm text-foreground lg:whitespace-normal">
                      {svc.label}
                    </span>
                    <span className="hidden font-mono text-[9px] uppercase tracking-widest text-muted-2 lg:block">
                      0{i + 1}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            {/* Hints that the pill row scrolls further on mobile, where the
                list can't fit the viewport (desktop switches to a full
                vertical sidebar via lg:flex-col, so no fade needed there). */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent lg:hidden" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-border bg-surface p-6 md:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
                What I Solve
              </p>
              <p className="mt-2 text-base leading-relaxed text-foreground">{s.solve}</p>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
                    What I Do
                  </p>
                  <ul className="mt-3 space-y-2">
                    {s.actions.map((a) => (
                      <li key={a} className="text-sm text-foreground">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
                    Deliverables
                  </p>
                  <ul className="mt-3 space-y-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="text-sm text-foreground">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-background p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
                  When This Applies
                </p>
                <p className="mt-2 text-sm text-muted">{s.whenToHire}</p>
              </div>

              <Link
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-signal hover:underline"
              >
                Start with {s.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
