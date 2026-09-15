"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function AssetImage({
  src,
  alt,
  className,
  icon: Icon = ImageIcon,
  fit = "cover",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  icon?: LucideIcon;
  fit?: "cover" | "contain";
  // Above-the-fold images (the hero portrait) need this so Next skips
  // lazy-loading them — otherwise the largest, most LCP-critical image on
  // the page loads no earlier than everything below it.
  priority?: boolean;
}) {
  const [status, setStatus] = useState<"loading" | "ok" | "missing">("loading");
  // Tracks which src the current status actually belongs to. Without this,
  // switching src on an already-mounted instance (e.g. next/prev in a
  // gallery) briefly renders the *previous* image's result while a new
  // probe is still in flight.
  const [statusSrc, setStatusSrc] = useState(src);
  if (src !== statusSrc) {
    setStatusSrc(src);
    setStatus("loading");
  }

  useEffect(() => {
    let cancelled = false;
    const probe = new window.Image();
    probe.onload = () => !cancelled && setStatus("ok");
    probe.onerror = () => !cancelled && setStatus("missing");
    probe.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (status !== "ok") {
    return (
      <div className={cn("flex items-center justify-center bg-surface-2", className)}>
        <Icon className="h-7 w-7 text-muted-2" strokeWidth={1.25} />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    </div>
  );
}
