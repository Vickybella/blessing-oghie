"use client";

import { useState } from "react";
import { Expand, TrendingUp } from "lucide-react";
import { Modal } from "./modal";
import { AssetImage } from "./asset-image";
import type { AdReport } from "@/data/projects";

export function AdReports({ reports }: { reports: AdReport[] }) {
  const [open, setOpen] = useState<AdReport | null>(null);

  if (reports.length === 0) return null;

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-signal">Ad Reports</p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {reports.map((r, i) => {
          const seenBefore = reports.slice(0, i).some((prev) => prev.screenshotSrc === r.screenshotSrc);
          return (
          <button
            key={r.campaign}
            onClick={() => setOpen(r)}
            className="card-hover group overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-sm"
          >
            {seenBefore ? (
              <div className="flex aspect-[4/3] w-full items-center justify-center border-b border-border bg-surface-2 px-6 text-center">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
                  Same dashboard, different campaign row, tap to view
                </p>
              </div>
            ) : (
              <div className="relative">
                <AssetImage
                  src={r.screenshotSrc}
                  alt={r.campaign}
                  className="aspect-[4/3] w-full border-b border-border"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                  <Expand
                    className="h-5 w-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            )}
            <div className="p-5">
              <p className="font-display text-sm leading-snug text-foreground">{r.campaign}</p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-2xl text-signal">{r.resultCount}</p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-2">
                    {r.resultLabel}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-foreground">{r.costPerResult}</p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-2">
                    Cost / Result
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                <TrendingUp className="h-3 w-3" strokeWidth={1.5} />
                {r.spend} spent
              </div>
            </div>
          </button>
          );
        })}
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)}>
        {open && (
          <>
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
              {open.campaign}
            </p>
            <AssetImage
              src={open.screenshotSrc}
              alt={open.campaign}
              className="mt-4 max-h-[70vh] w-full rounded-xl border border-border object-contain"
            />
          </>
        )}
      </Modal>
    </div>
  );
}
