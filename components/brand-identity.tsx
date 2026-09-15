"use client";

import { useState } from "react";
import { Palette, Expand, FileText, X } from "lucide-react";
import { Modal } from "./modal";
import { AssetImage } from "./asset-image";
import { cn } from "@/lib/utils";
import type { BrandAsset } from "@/data/projects";

export function BrandIdentity({
  assets,
  guidelinesPdf,
}: {
  assets: BrandAsset[];
  guidelinesPdf?: string;
}) {
  const [open, setOpen] = useState<BrandAsset | null>(null);
  const [pdfOpen, setPdfOpen] = useState(false);

  if (assets.length === 0) return null;

  return (
    <div className="mb-14">
      <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
        Brand Identity
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {assets.map((a) => (
          <button
            key={a.label}
            onClick={() => setOpen(a)}
            className="card-hover group overflow-hidden rounded-xl border border-border bg-surface text-left shadow-sm"
          >
            <div
              className={cn(
                "relative flex aspect-[4/3] items-center justify-center p-4",
                a.bg === "dark" ? "bg-[#0a0a0d]" : "bg-white",
              )}
            >
              <AssetImage
                src={a.imageSrc}
                alt={a.label}
                icon={Palette}
                fit="contain"
                className="h-full w-full"
              />
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300",
                  a.bg === "dark" ? "group-hover:bg-white/10" : "group-hover:bg-black/10",
                )}
              >
                <Expand
                  className={cn(
                    "h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    a.bg === "dark" ? "text-white/70" : "text-black/60",
                  )}
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <p className="truncate border-t border-border px-2 py-2 font-mono text-[9px] uppercase tracking-widest text-muted">
              {a.label}
            </p>
          </button>
        ))}
      </div>

      {guidelinesPdf && (
        <button
          type="button"
          onClick={() => setPdfOpen(true)}
          className="card-hover mt-5 inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm text-foreground shadow-sm"
        >
          <FileText className="h-4 w-4 text-signal" strokeWidth={1.75} />
          View the full Brand Guidelines document
        </button>
      )}

      <Modal open={!!open} onClose={() => setOpen(null)}>
        {open && (
          <>
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
              {open.label}
            </p>
            <div
              className={cn(
                "mt-4 flex aspect-[4/3] items-center justify-center rounded-xl border border-border p-10",
                open.bg === "dark" ? "bg-[#0a0a0d]" : "bg-white",
              )}
            >
              <AssetImage
                src={open.imageSrc}
                alt={open.label}
                icon={Palette}
                fit="contain"
                className="h-full w-full"
              />
            </div>
          </>
        )}
      </Modal>

      {pdfOpen && guidelinesPdf && (
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
            <iframe src={guidelinesPdf} title="Brand Guidelines PDF" className="flex-1" />
          </div>
        </div>
      )}
    </div>
  );
}
