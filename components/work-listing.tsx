"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { CoverImage } from "@/components/cover-image";
import { projects, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

const filters: ("All" | ProjectCategory)[] = [
  "All",
  "Creative",
  "Performance",
  "Digital",
  "Ecommerce",
  "Web",
];

export function WorkListing() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.categories.includes(active))),
    [active],
  );

  return (
    <section className="border-b border-border px-6 py-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
            All Real Work
          </p>
          <a
            href="/portfolio.pdf"
            download="Ms. Blessing Oghie, Portfolio.pdf"
            className="flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:border-signal hover:text-signal"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={2} />
            Download Portfolio
          </a>
        </div>

        <div
          role="group"
          aria-label="Filter real work by category"
          className="mt-4 flex flex-wrap gap-2"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                active === f
                  ? "border-signal bg-signal text-white"
                  : "border-border-strong text-muted hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
            >
              <Link
                href={`/work/${p.slug}`}
                className="card-hover group block overflow-hidden rounded-2xl border border-border bg-surface shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
              >
                <CoverImage
                  src={p.coverImage}
                  alt={p.client}
                  fit={p.coverFit}
                  className="aspect-[4/3] w-full"
                />
                <div className="flex items-center justify-between border-t border-border p-5">
                  <div>
                    <p className="font-display text-lg text-foreground">{p.client}</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted">
                      {p.industry} · {p.categories.join(" · ")}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-2 transition-colors group-hover:text-signal" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
