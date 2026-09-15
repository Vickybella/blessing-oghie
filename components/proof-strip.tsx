"use client";

import { motion } from "framer-motion";
import { adStats } from "@/data/projects";

// Real, verified numbers — the same ones shown in "Behind the Numbers" —
// surfaced here so proof is visible above the fold, not buried mid-scroll.
const proofPoints = [
  { value: adStats.careerAdSpend, label: "Ad Spend Managed" },
  { value: adStats.conversationsStarted.toLocaleString(), label: "Real Leads Generated" },
  { value: String(adStats.brandsServed), label: "Brands Served" },
  { value: String(adStats.campaignsRun), label: "Campaigns Run" },
];

export function ProofStrip() {
  return (
    <section className="border-b border-border px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-4">
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-signal">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
          Verified
        </span>
        {proofPoints.map((p, i) => (
          <motion.p
            key={p.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex items-baseline gap-2 border-l border-border pl-10"
          >
            <span className="font-display text-xl text-foreground">{p.value}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
              {p.label}
            </span>
          </motion.p>
        ))}
      </div>
    </section>
  );
}
