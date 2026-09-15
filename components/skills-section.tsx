"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { skillCategories } from "@/data/content";

export function SkillsSection() {
  return (
    <section id="skills" className="border-b border-border px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-signal">
          Skills
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
          What I actually do.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Everything I use to take a brand from an idea to a sale.
        </p>

        <div
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "1200px" }}
        >
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, rotateX: -20, y: 24 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              whileHover={{ rotateX: -4, y: -3 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: ci * 0.06, ease: "easeOut" }}
              style={{ transformStyle: "preserve-3d", transformOrigin: "top center" }}
              className="card-hover rounded-2xl border border-border bg-surface p-4"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-signal/10">
                  <cat.icon className="h-4 w-4 text-signal" strokeWidth={1.5} />
                </div>
                <p className="font-display text-base text-foreground">{cat.label}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border-strong bg-background px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <Link
          href="/#work"
          className="mt-10 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-signal hover:underline"
        >
          See it applied in real work
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
