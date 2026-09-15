"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, UserRound } from "lucide-react";
import { testimonials } from "@/data/content";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section className="border-b border-border bg-surface px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Proof"
          title="What it's like to work with me"
          description="What I was brought in to do → what actually changed → the result, in their own words."
        />

        <div className="flex max-w-2xl items-center gap-4 print:hidden">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:text-foreground sm:flex"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>

          <div className="relative flex-1 overflow-hidden rounded-3xl border border-border bg-background p-8 shadow-sm md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2">
                    <UserRound className="h-6 w-6 text-muted-2" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-display text-base text-foreground">{current.name}</p>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted-2">
                      {current.role}
                    </p>
                  </div>
                </div>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground">
                  {current.quote}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:text-foreground sm:flex"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Print only: the carousel only shows one testimonial at a time,
            which a static capture can't cycle through — show all of them. */}
        <div className="hidden print:grid print:grid-cols-2 print:gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-background p-6">
              <p className="font-display text-sm text-foreground">{t.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
                {t.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{t.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
