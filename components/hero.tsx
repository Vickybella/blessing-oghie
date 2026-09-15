"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Portrait } from "./portrait";
import { adStats } from "@/data/projects";

// The PDF export script navigates to /?static=1. Framer Motion elements
// normally mount at initial={{opacity:0,...}} and animate to visible on a
// timer — fine live, but the PDF capture happens in a single headless
// snapshot with no guarantee it lands after that animation settles (three
// different after-the-fact "clear the inline style" attempts in
// scripts/generate-portfolio-pdf.mjs all lost that race unpredictably on
// the production server). initial={false} skips the invisible starting
// state entirely — Framer Motion renders straight at the animate target,
// so there's no timing-dependent state to race against in the first place.
function useSkipEntranceAnimation() {
  const [skip] = useState(
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("static") === "1",
  );
  return skip;
}

export function Hero() {
  const skipAnimation = useSkipEntranceAnimation();
  return (
    <section id="top" className="relative w-full overflow-hidden border-b border-border">
      <div data-hero-grid className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
        {/* text column */}
        <div className="relative z-10 flex flex-col justify-center px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: "radial-gradient(60% 45% at 20% 10%, rgba(124,58,237,0.2), transparent 70%)",
            }}
          />

          <motion.h1
            initial={skipAnimation ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-xl font-display text-[13vw] font-medium leading-[0.98] tracking-tight text-white sm:text-6xl md:text-[4.6rem]"
          >
            {adStats.careerAdSpend} in ads managed.
            <br />
            Creative, media, and growth, run by one person.
          </motion.h1>

          <motion.p
            initial={skipAnimation ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-signal"
          >
            Creative Strategist × Performance Marketer
          </motion.p>

          <motion.p
            initial={skipAnimation ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/60"
          >
            Consumer psychology, sharp creative, paid media, and the digital marketing layer
            around it, working together to turn a scroll into a sale, and a sale into growth
            that compounds.
          </motion.p>

          <motion.div
            initial={skipAnimation ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/#work"
              className="rounded-full bg-white px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
            >
              View My Work
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border border-white/20 px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-signal hover:text-signal"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>

          <motion.div
            initial={skipAnimation ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="mt-8 hidden w-fit items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm lg:flex"
          >
            <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-signal">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
              Verified
            </span>
            <span className="h-3 w-px bg-white/20" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/70">
              {adStats.brandsServed} Brands Served · {adStats.conversationsStarted.toLocaleString()}{" "}
              Real Leads
            </p>
          </motion.div>
        </div>

        {/* portrait column — full-bleed, art-directed */}
        <motion.div
          data-hero-portrait
          initial={skipAnimation ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="relative min-h-[380px] lg:min-h-[calc(100svh-4rem)]"
        >
          <Portrait
            src="/portrait.jpg"
            alt="Blessing Oghie, Creative Strategist × Performance Marketer"
            className="absolute inset-0 h-full w-full grayscale"
            priority
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(200deg, rgba(124,58,237,0.5) 0%, rgba(10,10,13,0.1) 45%, rgba(10,10,13,0.8) 100%)",
              mixBlendMode: "multiply",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-24 lg:hidden"
            style={{ background: "linear-gradient(to right, #0a0a0d, transparent)" }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24 lg:h-32"
            style={{ background: "linear-gradient(to bottom, #0a0a0d, transparent)" }}
          />
          <div className="absolute bottom-6 left-6 right-6 flex items-baseline justify-between border-t border-white/15 pt-4 lg:bottom-10 lg:left-10 lg:right-10">
            <p className="font-display text-lg text-white">Blessing Oghie</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/50">
              Lagos · Global
            </p>
          </div>
        </motion.div>

        {/* Same badge as the desktop text column, shown here instead so it
            reads after the portrait on mobile rather than squeezed above it. */}
        <div className="flex w-fit items-center gap-3 rounded-full border border-border bg-surface px-4 py-2 mx-6 my-6 lg:hidden">
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-signal">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
            Verified
          </span>
          <span className="h-3 w-px bg-border-strong" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {adStats.brandsServed} Brands Served · {adStats.conversationsStarted.toLocaleString()}{" "}
            Real Leads
          </p>
        </div>
      </div>
    </section>
  );
}
