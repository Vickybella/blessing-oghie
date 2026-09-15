"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, LineChart, Megaphone, Target } from "lucide-react";
import { Portrait } from "./portrait";
import { Certificates } from "./certificates";
import { tools } from "./tool-icons";
import { adStats } from "@/data/projects";

const philosophy = [
  {
    title: "Economics taught me the questions.",
    body: "Why does someone choose this over the alternative. What trade-off are they actually making. What happens to demand when the price, the offer, or the story changes.",
    icon: LineChart,
  },
  {
    title: "Marketing taught me what to do with the answers.",
    body: "Turn the insight into an angle. The angle into a hook. The hook into a story that earns attention on purpose, not by accident, because people buy from stories, not a brochure.",
    icon: Megaphone,
  },
  {
    title: "Performance told me if I was right.",
    body: "The market doesn't argue with you. It just doesn't click, or it does. Ad accounts are one of the fastest feedback loops available for testing an idea about human behaviour.",
    icon: Target,
  },
];

const workingStyle = [
  "One variable at a time. Change five things and you learn nothing.",
  "ROAS means nothing to me alone, I read it against contribution margin or not at all.",
  "The hook comes before the brief, always in that order.",
  "A losing creative gets killed fast. I don't defend sunk cost.",
  "The landing page, the email flow, the SEO basics, that's the campaign, not the afterthought.",
  "I own the channel end to end: the creative, the media, the digital layer holding it up.",
  "Social gets a funnel, not just a calendar. It's a channel like any other.",
  "I check GA4 and the pixel myself. I don't take a campaign's numbers on faith.",
];

export function AboutFull() {
  return (
    <section id="about" className="border-b border-border bg-surface px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[380px_1fr] md:gap-16">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border shadow-sm md:max-w-none">
            <Portrait
              src="/portrait-about-2.png"
              alt="Blessing Oghie"
              className="absolute inset-0 h-full w-full"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(200deg, rgba(124,58,237,0.5) 0%, rgba(10,10,13,0.1) 45%, rgba(10,10,13,0.8) 100%)",
                mixBlendMode: "multiply",
              }}
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl border border-white/15 bg-black/40 px-4 py-3 backdrop-blur-sm">
              <p className="font-display text-2xl text-white">{adStats.experienceYears}</p>
              <p className="font-mono text-[9px] uppercase leading-tight tracking-widest text-white/70">
                Years
                <br />
                Experience
              </p>
            </div>
          </div>
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-signal">
              About
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              I studied Economics before I ever wrote an ad, and it still shows in every one I
              write.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Blessing Oghie, Creative Strategist × Performance Marketer, based in Lagos,
              working globally. B.Sc. Economics, University of Lagos.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
            How I Think
          </p>

          <div className="relative mt-10">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="absolute bottom-1 left-5 top-1 w-px bg-border"
              style={{ transformOrigin: "top" }}
            />
            <div className="space-y-10">
              {philosophy.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                  className="relative flex gap-6"
                >
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-signal/40 bg-background">
                    <p.icon className="h-4 w-4 text-signal" strokeWidth={1.5} />
                  </span>
                  <div className="max-w-2xl pt-1.5">
                    <h3 className="font-display text-xl text-foreground md:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted">{p.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
            Working Style
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {workingStyle.map((w, i) => (
              <motion.li
                key={w}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                className="group flex items-start gap-3 rounded-xl border border-border bg-background p-5 text-sm text-foreground transition-colors hover:border-signal/40"
              >
                <span className="mt-0.5 shrink-0 font-mono text-[10px] font-semibold text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{w}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-20">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
            What Runs Underneath
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span
                key={tool.name}
                className="rounded-lg border border-border bg-background px-4 py-2 font-mono text-xs text-muted"
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>

        <Certificates />

        <div className="mt-20 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <p className="font-display text-base text-foreground">B.Sc. Economics</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
                University of Lagos
              </p>
            </div>
            <div>
              <p className="font-display text-base text-foreground">Lagos, Nigeria</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
                Working Globally
              </p>
            </div>
          </div>
          <a
            href="/cv.pdf"
            download="Ms. Blessing Oghie.pdf"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border-strong px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-signal/40 hover:text-foreground sm:ml-auto sm:border-0 sm:px-0 sm:py-0"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
            Download CV
          </a>
        </div>

        <Link
          href="#work"
          className="mt-16 inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white transition-transform hover:scale-105"
        >
          See the work
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
