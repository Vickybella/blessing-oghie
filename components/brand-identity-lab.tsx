"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Expand, Palette, FileText, X } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { AssetImage } from "./asset-image";
import { Modal } from "./modal";
import { cn } from "@/lib/utils";
import { brandIdentityWork, brandGuidelinesPdf, type BrandIdentityWork } from "@/data/content";

export function BrandIdentityLab() {
  const [open, setOpen] = useState<BrandIdentityWork | null>(null);
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <section className="border-b border-border px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Brand Identity"
          title="Systems, not one-off logos."
          description="Logo marks, colour systems, and the guidelines behind them. Click any piece to inspect it."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {brandIdentityWork.map((b, i) => (
            <motion.button
              key={b.title}
              onClick={() => setOpen(b)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group overflow-hidden rounded-2xl border border-border text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_16px_40px_-12px_rgba(124,58,237,0.25)]"
            >
              <div
                className={cn(
                  "relative flex aspect-[4/3] items-center justify-center p-8",
                  b.bg === "dark" ? "bg-[#0a0a0d]" : "bg-white",
                )}
              >
                <AssetImage
                  src={b.imageSrc}
                  alt={b.title}
                  icon={Palette}
                  fit="contain"
                  className="h-full w-full"
                />
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300",
                    b.bg === "dark" ? "group-hover:bg-white/10" : "group-hover:bg-black/10",
                  )}
                >
                  <Expand
                    className={cn(
                      "h-5 w-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                      b.bg === "dark" ? "text-white/70" : "text-black/60",
                    )}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <div className="border-t border-border bg-surface px-2 py-2 sm:px-3">
                <p className="truncate font-mono text-[9px] uppercase tracking-widest text-muted sm:text-[10px]">
                  {b.title}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {brandGuidelinesPdf && (
          <button
            type="button"
            onClick={() => setPdfOpen(true)}
            className="card-hover mt-8 inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm text-foreground shadow-sm"
          >
            <FileText className="h-4 w-4 text-signal" strokeWidth={1.75} />
            View the full Brand Guidelines document
          </button>
        )}
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)}>
        {open && (
          <>
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
              {open.category}
            </p>
            <p className="mt-1 font-display text-lg text-foreground">{open.title}</p>
            <div
              className={cn(
                "mt-4 flex aspect-[4/3] items-center justify-center rounded-xl border border-border p-10",
                open.bg === "dark" ? "bg-[#0a0a0d]" : "bg-white",
              )}
            >
              <AssetImage
                src={open.imageSrc}
                alt={open.title}
                icon={Palette}
                fit="contain"
                className="h-full w-full"
              />
            </div>
          </>
        )}
      </Modal>

      {pdfOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 sm:p-8">
          <div className="relative flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                Brand Guidelines
              </p>
              <button
                type="button"
                onClick={() => setPdfOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <iframe src={brandGuidelinesPdf} title="Brand Guidelines PDF" className="flex-1" />
          </div>
        </div>
      )}
    </section>
  );
}
