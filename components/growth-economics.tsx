"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { ArrowRight, UserPlus, ShoppingBag, Repeat2, PieChart, Gauge, Wallet } from "lucide-react";
import { SectionHeading } from "./section-heading";

const chain = ["Revenue", "Variable Costs", "Contribution Margin", "vs. CAC", "Profit After Ad Spend"];

const terms = [
  {
    term: "CAC",
    def: "What it actually costs to acquire one paying customer.",
    icon: UserPlus,
    motion: "spend-in",
  },
  {
    term: "AOV",
    def: "Average order value: how much each purchase is worth.",
    icon: ShoppingBag,
    motion: "bag-fill",
  },
  {
    term: "LTV",
    def: "What a customer is worth across the full relationship.",
    icon: Repeat2,
    motion: "loop",
  },
  {
    term: "Contribution Margin",
    def: "What's left after variable costs, before fixed costs.",
    icon: PieChart,
    motion: "slice",
  },
  {
    term: "Break-Even ROAS",
    def: "The ROAS below which the campaign loses money.",
    icon: Gauge,
    motion: "needle",
  },
  {
    term: "Profit After Ad Spend",
    def: "The number that actually decides whether to scale.",
    icon: Wallet,
    motion: "pulse",
  },
];

const iconMotion: Record<string, TargetAndTransition> = {
  "spend-in": { x: [-6, 0, -6], transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } },
  "bag-fill": { scale: [1, 1.15, 1], transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } },
  loop: { rotate: [0, 360], transition: { duration: 2.4, repeat: Infinity, ease: "linear" } },
  slice: { rotate: [-8, 8, -8], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
  needle: { rotate: [-24, 24, -24], transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } },
  pulse: { scale: [1, 1.12, 1], opacity: [1, 0.75, 1], transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" } },
};

export function GrowthEconomics() {
  return (
    <section className="border-b border-border px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Growth Economics"
          title="Marketing is creative. Growth is economic."
          description="A strong ROAS can still lose money after real costs. Ad metrics aren't business economics."
        />

        <div className="flex flex-wrap items-center gap-x-2 gap-y-4 rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
          {chain.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="flex items-center gap-2"
            >
              <span className="rounded-full border border-border-strong px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground">
                {step}
              </span>
              {i < chain.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-2" strokeWidth={1.5} />
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
              Unit Economics: Reference Panel
            </p>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-signal">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
              How I Read Every Account
            </span>
          </div>

          <div
            className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
            style={{ perspective: "1200px" }}
          >
            {terms.map((t, i) => (
              <motion.div
                key={t.term}
                initial={{ opacity: 0, rotateX: -18, y: 14 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d", transformOrigin: "top center" }}
                className="bg-surface p-6"
              >
                <div className="flex items-center justify-between">
                  <motion.div
                    animate={iconMotion[t.motion]}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal/10"
                  >
                    <t.icon className="h-5 w-5 text-signal" strokeWidth={1.5} />
                  </motion.div>
                  <span className="font-mono text-[9px] text-muted-2">0{i + 1}</span>
                </div>
                <p className="mt-4 font-display text-lg text-signal">{t.term}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.def}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
