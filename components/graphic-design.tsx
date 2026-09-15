"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { AssetImage } from "./asset-image";
import { Modal } from "./modal";
import { graphicDesignWork, type GraphicDesignWork } from "@/data/content";

export function GraphicDesign() {
  const [open, setOpen] = useState<GraphicDesignWork | null>(null);

  return (
    <section className="border-b border-border px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Graphic Design"
          title="Made by hand."
          description="Static creative and social graphics, designed start to finish. Every piece opens larger."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {graphicDesignWork.map((g, i) => (
            <motion.button
              key={g.imageSrc}
              onClick={() => setOpen(g)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-border text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_16px_40px_-12px_rgba(124,58,237,0.25)]"
            >
              <AssetImage
                src={g.imageSrc}
                alt={g.title}
                fit="contain"
                className="aspect-[4/5] w-full bg-white p-3 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                <Expand
                  className="h-5 w-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  strokeWidth={1.5}
                />
              </div>
              <p className="border-t border-border bg-surface px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-muted">
                {g.category}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)}>
        {open && (
          <>
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
              {open.category}
            </p>
            <p className="mt-1 font-display text-lg text-foreground">{open.title}</p>
            <AssetImage
              src={open.imageSrc}
              alt={open.title}
              fit="contain"
              className="mt-4 aspect-[4/5] w-full rounded-xl border border-border bg-white p-6"
            />
          </>
        )}
      </Modal>
    </section>
  );
}
