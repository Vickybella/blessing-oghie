import { NextResponse } from "next/server";
import { resend, NOTIFY_EMAIL, FROM_EMAIL } from "@/lib/mailer";
import { redis } from "@/lib/redis";

type Visit = {
  path: string;
  referrer: string;
  country: string;
  city: string;
  userAgent: string;
  time: string;
};

function summarize(visits: Visit[]) {
  const count = (list: string[]) => {
    const tally = new Map<string, number>();
    for (const item of list) tally.set(item, (tally.get(item) ?? 0) + 1);
    return [...tally.entries()].sort((a, b) => b[1] - a[1]);
  };

  const topPages = count(visits.map((v) => v.path));
  const topReferrers = count(visits.map((v) => v.referrer));
  const topLocations = count(
    visits.map((v) => (v.city !== "Unknown" ? `${v.city}, ${v.country}` : v.country)),
  );

  return { topPages, topReferrers, topLocations };
}

function formatList(entries: [string, number][], limit = 8) {
  return entries
    .slice(0, limit)
    .map(([label, n]) => `  ${n.toString().padStart(3)}  ${label}`)
    .join("\n");
}

// Called on a schedule by Vercel Cron (see vercel.json). Reads every visit
// logged by proxy.ts since the last run, emails a summary, then clears the
// log so the next digest only covers the new period.
export async function GET(request: Request) {
  // Require CRON_SECRET to be set, rather than only checking it when
  // present — otherwise anyone who finds this URL could repeatedly call it
  // and permanently wipe the visit log with no authentication at all.
  if (!process.env.CRON_SECRET) {
    console.error("Digest cron: CRON_SECRET not configured.");
    return NextResponse.json({ error: "Not configured." }, { status: 500 });
  }
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!redis) {
    return NextResponse.json({ error: "Visit tracking is not configured." }, { status: 500 });
  }

  // Atomically hand off the live key to a scratch name first, so any visit
  // proxy.ts pushes while this handler is running lands in a fresh
  // "portfolio:visits" list instead of being read past and then wiped by a
  // separate del() call.
  const processingKey = `portfolio:visits:processing:${Date.now()}`;
  const renamed = await redis.renamenx("portfolio:visits", processingKey).catch(() => 0);

  if (!renamed) {
    return NextResponse.json({ ok: true, sent: false, reason: "No visits in this period." });
  }

  const raw = await redis.lrange(processingKey, 0, -1);
  const visits: Visit[] = raw
    .map((entry) => {
      try {
        return typeof entry === "string" ? (JSON.parse(entry) as Visit) : (entry as Visit);
      } catch {
        return null;
      }
    })
    .filter((v): v is Visit => v !== null);

  if (visits.length === 0) {
    await redis.del(processingKey);
    return NextResponse.json({ ok: true, sent: false, reason: "No visits in this period." });
  }

  const { topPages, topReferrers, topLocations } = summarize(visits);

  if (!resend) {
    console.error("Digest cron: RESEND_API_KEY not configured, keeping visits for next run.");
    // Put the batch back rather than deleting it, so this period's visits
    // still make it into the next digest once email is configured.
    if (visits.length > 0) await redis.rpush("portfolio:visits", ...raw);
    await redis.del(processingKey);
    return NextResponse.json({ ok: true, sent: false, reason: "Email is not configured yet." });
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFY_EMAIL,
    subject: `Portfolio digest: ${visits.length} visit${visits.length === 1 ? "" : "s"}`,
    text: [
      `${visits.length} visit${visits.length === 1 ? "" : "s"} since the last digest.`,
      "",
      "Top pages:",
      formatList(topPages),
      "",
      "Top referrers:",
      formatList(topReferrers),
      "",
      "Top locations:",
      formatList(topLocations),
    ].join("\n"),
  });

  if (error) {
    console.error("Digest cron: send failed, keeping visits for next run:", error);
    if (visits.length > 0) await redis.rpush("portfolio:visits", ...raw);
    await redis.del(processingKey);
    return NextResponse.json({ ok: false, sent: false, error: "Could not send digest." });
  }

  // Only clear the scratch key now that the email actually went out —
  // "portfolio:visits" itself was never touched, so new visits pushed
  // during this run are untouched too.
  await redis.del(processingKey);

  return NextResponse.json({ ok: true, sent: true, count: visits.length });
}
