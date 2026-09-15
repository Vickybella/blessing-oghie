"use client";

import { useState } from "react";
import { Award, Expand } from "lucide-react";
import { Modal } from "./modal";
import { AssetImage } from "./asset-image";
import { certificates, type Certificate } from "@/data/content";

export function Certificates() {
  const [open, setOpen] = useState<Certificate | null>(null);

  return (
    <div className="mt-20">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
        Certifications
      </p>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {certificates.map((c) => (
          <button
            key={c.title}
            onClick={() => setOpen(c)}
            className="card-hover group overflow-hidden rounded-xl border border-border bg-surface text-left shadow-sm"
          >
            <div className="relative aspect-[4/3] bg-[#0a0a0d]">
              <AssetImage
                src={c.imageSrc}
                alt={c.title}
                icon={Award}
                fit="contain"
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                <Expand
                  className="h-4 w-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <p className="truncate border-t border-border px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-muted">
              {c.title}
            </p>
          </button>
        ))}
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)}>
        {open && (
          <>
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
              {open.title}
            </p>
            {open.issuer && <p className="mt-1 text-sm text-muted">{open.issuer}</p>}
            <AssetImage
              src={open.imageSrc}
              alt={open.title}
              icon={Award}
              fit="contain"
              className="mt-4 aspect-[4/3] w-full rounded-xl border border-border bg-[#0a0a0d]"
            />
          </>
        )}
      </Modal>
    </div>
  );
}
