"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { flagshipProject } from "@/data/projects";
import { SectionHeading } from "./section-heading";
import { CoverImage } from "./cover-image";
import { PENDING } from "@/data/content";

export function FeaturedWork() {
  return (
    <section id="work" className="border-b border-border px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="A Project I Worked On"
          title="The full story."
          description="Problem → decision → creative → result. One real project, in detail."
        />

        <Link
          href={`/work/${flagshipProject.slug}`}
          className="card-hover group grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm lg:grid-cols-[1fr_0.85fr]"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="relative order-2 flex flex-col justify-center p-8 lg:order-1 md:p-12 lg:p-16"
          >
            <motion.p
              variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
              className="font-mono text-[10px] uppercase tracking-widest text-signal"
            >
              {String(1).padStart(2, "0")} / {flagshipProject.industry}
            </motion.p>
            <motion.h3
              variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
              className="mt-4 font-display text-4xl leading-[1.02] text-foreground md:text-5xl"
            >
              {flagshipProject.client}
            </motion.h3>
            <motion.p
              variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
              className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted"
            >
              {flagshipProject.categories.join(" · ")}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
              className="mt-8 space-y-4 border-t border-border pt-6"
            >
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-2">
                  The Problem
                </p>
                <p className="mt-1 text-sm text-muted">{flagshipProject.challenge ?? PENDING}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-2">
                  The Decision
                </p>
                <p className="mt-1 text-sm text-muted">{flagshipProject.strategy ?? PENDING}</p>
              </div>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
              className="mt-8 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-foreground"
            >
              View The Work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            className="order-1 lg:order-2"
          >
            <CoverImage
              src={flagshipProject.coverImage}
              alt={flagshipProject.client}
              fit={flagshipProject.coverFit}
              className="aspect-[4/3] w-full lg:aspect-auto lg:h-full"
            />
          </motion.div>
        </Link>

        <div className="mt-6 text-right">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-signal hover:underline"
          >
            View more
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
