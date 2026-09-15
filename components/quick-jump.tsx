import Link from "next/link";

const roles = [
  { label: "Performance Marketing", href: "/#work" },
  { label: "Creative Strategy", href: "/#creative-lab" },
  { label: "Social Media", href: "/#social" },
  { label: "Full Skill Set", href: "/#skills" },
];

export function QuickJump() {
  return (
    <section className="border-b border-border px-6 py-6 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
          Hiring for
        </p>
        {roles.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="rounded-full border border-border-strong px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-signal hover:text-signal"
          >
            {r.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
