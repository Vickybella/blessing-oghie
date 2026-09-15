"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { landingPages } from "@/data/content";
import { SectionHeading } from "./section-heading";
import { AssetImage } from "./asset-image";

export function LandingPages() {
  return (
    <section className="border-b border-border bg-surface px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Landing Pages"
          title="Real pages, live on the internet."
          description="No mockups. Every one of these is live, indexed, and taking traffic right now."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {landingPages.map((p, i) => (
            <motion.a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="card-hover group overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
            >
              <div className="h-56 overflow-hidden">
                <AssetImage
                  src={p.snapshotSrc}
                  alt={p.title}
                  className="h-56 w-full object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between border-t border-border p-5">
                <div>
                  <p className="font-display text-base text-foreground">{p.title}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted">
                    gliztglobal.com
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
