"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Download, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#work", label: "Work" },
  { href: "/#creative-lab", label: "Creative Lab" },
  { href: "/#social", label: "Social" },
  { href: "/#services", label: "Services" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!downloadOpen) return;
    const onClick = (e: MouseEvent) => {
      if (downloadRef.current && !downloadRef.current.contains(e.target as Node)) {
        setDownloadOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [downloadOpen]);

  const solid = scrolled || !isHome;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        solid
          ? "border-b border-white/10 bg-black/85 backdrop-blur"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="font-display text-sm tracking-tight text-white">
          BLESSING OGHIE
        </Link>
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-signal hover:text-signal lg:hidden"
          >
            {menuOpen ? (
              <X className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
          <div ref={downloadRef} className="relative">
            <button
              type="button"
              onClick={() => setDownloadOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-signal hover:text-signal sm:px-5"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              <span className="hidden sm:inline">Download</span>
              <ChevronDown
                className={cn("h-3 w-3 transition-transform", downloadOpen && "rotate-180")}
                strokeWidth={2}
              />
            </button>
            {downloadOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-black/95 backdrop-blur">
                <a
                  href="/Blessing-Oghie.pdf"
                  download="Ms. Blessing Oghie.pdf"
                  onClick={() => setDownloadOpen(false)}
                  className="block px-4 py-3 font-mono text-xs uppercase tracking-widest text-white/80 transition-colors hover:bg-white/5 hover:text-signal"
                >
                  CV
                </a>
                <a
                  href="/portfolio.pdf"
                  download="Ms. Blessing Oghie, Portfolio.pdf"
                  onClick={() => setDownloadOpen(false)}
                  className="block border-t border-white/10 px-4 py-3 font-mono text-xs uppercase tracking-widest text-white/80 transition-colors hover:bg-white/5 hover:text-signal"
                >
                  Portfolio
                </a>
              </div>
            )}
          </div>
          <Link
            href="/#contact"
            className="rounded-full bg-signal px-5 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-white transition-transform hover:scale-105"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <ul className="border-t border-white/10 bg-black/95 backdrop-blur lg:hidden">
          {links.map((l) => (
            <li key={l.href} className="border-b border-white/5 last:border-b-0">
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 font-mono text-xs uppercase tracking-widest text-white/80 transition-colors hover:bg-white/5 hover:text-signal"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
