import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CoverImage } from "@/components/cover-image";
import { AdReports } from "@/components/ad-reports";
import { BrandIdentity } from "@/components/brand-identity";
import { PENDING } from "@/data/content";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.client,
    description: `${project.client}, real ${project.industry} work: ${project.categories.join(", ")}. Creative strategy and performance marketing by Blessing Oghie.`,
  };
}

const storyBlocks: { key: keyof (typeof projects)[number]; label: string }[] = [
  { key: "challenge", label: "The Problem" },
  { key: "strategy", label: "The Decision" },
  { key: "result", label: "The Result" },
  { key: "learnings", label: "The Learning" },
];

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const perf = project.performance;
  const metricGroups = [
    {
      label: "Creative",
      metrics: [
        ["Hook Rate", perf?.creative?.hookRate],
        ["CTR", perf?.creative?.ctr],
        ["Engagement", perf?.creative?.engagement],
      ],
    },
    {
      label: "Acquisition",
      metrics: [
        ["CPC", perf?.acquisition?.cpc],
        ["CPA", perf?.acquisition?.cpa],
        ["CAC", perf?.acquisition?.cac],
      ],
    },
    {
      label: "Conversion",
      metrics: [
        ["CVR", perf?.conversion?.cvr],
        ["AOV", perf?.conversion?.aov],
      ],
    },
    {
      label: "Business",
      metrics: [
        ["Revenue", perf?.business?.revenue],
        ["ROAS", perf?.business?.roas],
        ["Contribution Margin", perf?.business?.contributionMargin],
        ["Profit After Ad Spend", perf?.business?.profit],
      ],
    },
  ]
    .map((g) => ({ ...g, metrics: g.metrics.filter(([, v]) => v) }))
    .filter((g) => g.metrics.length > 0);

  return (
    <>
      <Nav />
      <main className="flex-1 px-6 pb-24 pt-32 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All the work
          </Link>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-signal">
            Project Overview
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
            {project.client}
          </h1>

          {(project.website || project.instagram) && (
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-signal"
                >
                  Website
                  <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
                </a>
              )}
              {project.instagram && (
                <a
                  href={project.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-signal"
                >
                  Instagram
                  <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
                </a>
              )}
            </div>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-6 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:grid-cols-3 lg:grid-cols-6">
            {[
              ["Client", project.client],
              ["Industry", project.industry],
              ["Role", project.role ?? PENDING],
              ["Services", project.categories.join(", ")],
              ["Timeline", project.timeline ?? PENDING],
              [
                "Verified",
                new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
              ],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-2">
                  {k}
                </dt>
                <dd className="mt-1 text-sm text-foreground">{v}</dd>
              </div>
            ))}
          </dl>

          <CoverImage
            src={project.coverImage}
            alt={project.client}
            fit={project.coverFit}
            className="mt-10 aspect-[16/9] w-full rounded-2xl border border-border shadow-sm"
          />

          <div className="mt-12 space-y-10">
            {storyBlocks.map((block, i) =>
              block.key === "strategy" ? (
                <div
                  key={block.key}
                  className="rounded-2xl border border-signal/30 bg-signal/5 p-6 md:p-8"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
                    The Decision
                  </p>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-foreground">
                    {(project[block.key] as string | undefined) ?? PENDING}
                  </p>
                </div>
              ) : (
                <div key={block.key} className="border-b border-border pb-10 last:border-b-0">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
                    {String(i + 2).padStart(2, "0")} / {block.label}
                  </p>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
                    {(project[block.key] as string | undefined) ?? PENDING}
                  </p>
                </div>
              ),
            )}
          </div>

          {project.brandAssets && (
            <BrandIdentity assets={project.brandAssets} guidelinesPdf={project.guidelinesPdf} />
          )}

          {project.adReports && project.adReports.length > 0 && (
            <div className="mb-14">
              <AdReports reports={project.adReports} />
            </div>
          )}

          {metricGroups.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
                06 / Performance
              </p>
              <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
                {metricGroups.map((g) => (
                  <div key={g.label} className="bg-surface p-6">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
                      {g.label}
                    </p>
                    <dl className="mt-3 space-y-2">
                      {g.metrics.map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-2 text-xs">
                          <dt className="text-muted-2">{k}</dt>
                          <dd className="text-foreground">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.testimonial && (
            <div className="mt-12 border border-border bg-surface p-8">
              <p className="font-display text-xl leading-relaxed text-foreground">
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-2">
                {project.testimonial.name}, {project.testimonial.role}
              </p>
            </div>
          )}

          <Link
            href="/#contact"
            className="mt-14 inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white transition-transform hover:scale-105"
          >
            Start a project like this
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
