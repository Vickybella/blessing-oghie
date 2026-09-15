"use client";

import { useState } from "react";
import {
  CalendarDays,
  ArrowUpRight,
  TrendingUp,
  ExternalLink,
  Images,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { PhoneFrame } from "./phone-frame";
import { AssetImage } from "./asset-image";
import { Modal } from "./modal";
import { contentCalendarUrl, managedPages, PENDING } from "@/data/content";

const flow = [
  "Strategy",
  "Content Pillars",
  "Audience",
  "Trend Research",
  "Formats",
  "Calendar",
  "Production",
  "Publishing",
  "Community",
  "Analytics",
  "Iteration",
];

export function SocialLayer() {
  const [gallery, setGallery] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <section id="social" className="border-b border-border px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Social Media Manager"
          title="Social is a channel with a funnel, and I run it like one."
          description="Strategy, content, and analytics under one system, the same rigor I bring to paid, applied to organic."
        />

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-4 py-2">
          <TrendingUp className="h-4 w-4 text-signal" strokeWidth={1.75} />
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            +20% engagement &amp; followers in 1 month
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
            The System
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {flow.map((step) =>
              step === "Calendar" ? (
                <a
                  key={step}
                  href={contentCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-signal transition-colors hover:bg-signal hover:text-white"
                >
                  {step}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ) : (
                <span
                  key={step}
                  className="rounded-full border border-border-strong bg-background px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted"
                >
                  {step}
                </span>
              ),
            )}
          </div>

          <a
            href={contentCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover mt-6 inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm text-foreground shadow-sm"
          >
            <CalendarDays className="h-4 w-4 text-signal" strokeWidth={1.75} />
            View the real content calendar
            <ArrowUpRight className="h-4 w-4 text-muted-2" />
          </a>
        </div>

        <div className="mt-14">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
            The Accounts
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            The actual pages I run, with the numbers to back them up.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {managedPages.map((page, i) => (
              <div
                key={i}
                className="card-hover group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
              >
                <div className="relative bg-gradient-to-b from-signal/10 to-transparent pb-8 pt-8">
                  <PhoneFrame className="max-w-[220px]">
                    <AssetImage
                      src={page.screenshotSrc}
                      alt={`${page.platform} page`}
                      className="h-full w-full"
                    />
                  </PhoneFrame>
                </div>

                <div className="border-t border-border p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-display text-lg text-foreground">{page.platform}</p>
                    {page.url ? (
                      <a
                        href={page.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-signal hover:underline"
                      >
                        {page.handle ?? "Visit"}
                        <ExternalLink className="h-3 w-3" strokeWidth={2} />
                      </a>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
                        {page.handle ?? PENDING}
                      </span>
                    )}
                  </div>

                  <dl className="mt-4 grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-background">
                    {(page.metrics && page.metrics.length > 0
                      ? page.metrics
                      : [
                          { label: "Followers", value: undefined },
                          { label: "Engagement", value: undefined },
                          { label: "Growth", value: undefined },
                        ]
                    ).map((m) => (
                      <div key={m.label} className="px-2 py-3 text-center">
                        <dd
                          className={
                            m.value
                              ? "font-display text-lg text-foreground"
                              : "font-mono text-xs text-muted-2"
                          }
                        >
                          {m.value ?? PENDING}
                        </dd>
                        <dt className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted-2">
                          {m.label}
                        </dt>
                      </div>
                    ))}
                  </dl>

                  {page.proofScreenshots && page.proofScreenshots.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setGallery({ images: page.proofScreenshots!, index: 0 })}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:border-signal/40 hover:text-signal"
                    >
                      <Images className="h-3.5 w-3.5" strokeWidth={1.75} />
                      View Insights
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal open={!!gallery} onClose={() => setGallery(null)}>
        {gallery && (
          <>
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
              View {gallery.index + 1} of {gallery.images.length}
            </p>
            <div className="relative mt-4">
              <AssetImage
                src={gallery.images[gallery.index]}
                alt={`Proof view ${gallery.index + 1}`}
                fit="contain"
                className="max-h-[70vh] w-full rounded-xl border border-border bg-background"
              />
              {gallery.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setGallery((g) =>
                        g
                          ? { ...g, index: (g.index - 1 + g.images.length) % g.images.length }
                          : g,
                      )
                    }
                    aria-label="Previous view"
                    className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm hover:text-signal"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setGallery((g) =>
                        g ? { ...g, index: (g.index + 1) % g.images.length } : g,
                      )
                    }
                    aria-label="Next view"
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm hover:text-signal"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
