"use client";

import { PlayCircle, ExternalLink } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { PhoneFrame } from "./phone-frame";
import { AssetImage } from "./asset-image";
import { InstagramEmbed } from "./instagram-embed";
import { videoReels, PENDING } from "@/data/content";

export function CreativeLabReel() {
  return (
    <section className="border-b border-border px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Ad Creative"
          title="The reel."
          description="Hook, angle, objective, result: the strategy behind every video."
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {videoReels.map((reel, n) =>
            reel.instagramUrl ? (
              <div key={n}>
                <div data-live-only>
                  <InstagramEmbed url={reel.instagramUrl} />
                </div>
                {/* Static fallback for the PDF export, where the live
                    Instagram embed script never runs: a real poster image
                    plus a real, clickable link to the actual post. */}
                <a
                  data-pdf-only
                  href={reel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mx-auto hidden w-full max-w-[326px] overflow-hidden rounded-2xl border border-border"
                >
                  <AssetImage
                    src={reel.creativeAssetURL}
                    alt="Instagram reel"
                    className="aspect-[4/5] w-full"
                  />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                    <PlayCircle className="h-9 w-9 text-white/80" strokeWidth={1.25} />
                  </span>
                </a>
                <dl className="mx-auto mt-4 max-w-[326px] space-y-1.5 rounded-xl border border-border bg-surface p-4 font-mono text-[9px] uppercase tracking-widest text-muted-2">
                  {[
                    ["Hook", reel.hook],
                    ["Angle", reel.angle],
                    ["Objective", reel.objective],
                    ["CTA", reel.cta],
                    ["Result", reel.result],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <dt>{k}</dt>
                      <dd className={v ? "text-right text-foreground" : "text-right"}>
                        {v ?? PENDING}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : (
              <div key={n} className="group">
                <PhoneFrame>
                  {reel.youtubeId ? (
                    <>
                      <div data-live-only className="h-full w-full">
                        <iframe
                          className="h-full w-full"
                          src={`https://www.youtube.com/embed/${reel.youtubeId}?start=${reel.startSeconds ?? 0}&playsinline=1&modestbranding=1&rel=0`}
                          title="Strategy video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      {/* Static fallback for the PDF export, where a live
                          YouTube iframe never renders: a real poster image
                          plus a real, clickable link to the actual video. */}
                      <a
                        data-pdf-only
                        href={`https://www.youtube.com/watch?v=${reel.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative hidden h-full w-full"
                      >
                        <AssetImage
                          src={reel.creativeAssetURL}
                          alt="Ad creative"
                          className="h-full w-full"
                        />
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                          <PlayCircle className="h-9 w-9 text-white/80" strokeWidth={1.25} />
                        </div>
                      </a>
                    </>
                  ) : (
                    <>
                      <AssetImage
                        src={reel.creativeAssetURL}
                        alt="Ad creative"
                        className="h-full w-full"
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                        <PlayCircle className="h-9 w-9 text-white/80" strokeWidth={1.25} />
                      </div>
                    </>
                  )}
                  {/* Desktop only: reveal-on-hover panel over the video itself. */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full bg-black/90 p-4 backdrop-blur transition-transform duration-300 group-hover:translate-y-0 md:block">
                    <dl className="space-y-1 font-mono text-[9px] uppercase tracking-widest text-white/60">
                      {[
                        ["Hook", reel.hook],
                        ["Angle", reel.angle],
                        ["Objective", reel.objective],
                        ["CTA", reel.cta],
                        ["Result", reel.result],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-2">
                          <dt className="text-white/35">{k}</dt>
                          <dd className={v ? "text-right" : "text-right text-white/35"}>
                            {v ?? PENDING}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </PhoneFrame>
                {reel.youtubeId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${reel.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-signal hover:underline"
                  >
                    Watch on YouTube
                    <ExternalLink className="h-3 w-3" strokeWidth={2} />
                  </a>
                )}
                {/* Mobile only: hover doesn't work on touch, so show the same
                    details as a static card instead of hiding them forever. */}
                <dl className="mt-3 space-y-1.5 rounded-xl border border-border bg-surface p-4 font-mono text-[9px] uppercase tracking-widest text-muted-2 md:hidden">
                  {[
                    ["Hook", reel.hook],
                    ["Angle", reel.angle],
                    ["Objective", reel.objective],
                    ["CTA", reel.cta],
                    ["Result", reel.result],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <dt>{k}</dt>
                      <dd className={v ? "text-right text-foreground" : "text-right"}>
                        {v ?? PENDING}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
