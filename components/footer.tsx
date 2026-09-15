import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { contactInfo } from "@/data/content";
import { whatsappUrl } from "@/lib/utils";

export function Footer() {
  const whatsappHref = contactInfo.phone ? whatsappUrl(contactInfo.phone) : undefined;

  return (
    <footer className="border-t border-border px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-muted-2">
          © {new Date().getFullYear()} Blessing Oghie
        </p>
        <div className="flex items-center gap-6">
          {contactInfo.linkedin && (
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-2 transition-colors hover:text-signal"
            >
              LinkedIn
              <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
            </a>
          )}
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-2 transition-colors hover:text-signal"
            >
              WhatsApp
              <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
            </a>
          )}
          <Link
            href="/#contact"
            className="font-mono text-xs uppercase tracking-widest text-signal hover:underline"
          >
            Let&apos;s talk
          </Link>
        </div>
      </div>
    </footer>
  );
}
