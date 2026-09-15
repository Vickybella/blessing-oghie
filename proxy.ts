import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";
import { redis } from "@/lib/redis";

// Records a lightweight visit log for the daily/weekly digest email.
// Skips static assets, API routes, and the sitemap/robots files so only
// real page views count.
export function proxy(request: NextRequest, event: NextFetchEvent) {
  if (redis) {
    const { pathname } = request.nextUrl;
    const visit = {
      path: pathname,
      referrer: request.headers.get("referer") || "direct",
      country: request.headers.get("x-vercel-ip-country") || "Unknown",
      city: request.headers.get("x-vercel-ip-city") || "Unknown",
      userAgent: request.headers.get("user-agent") || "Unknown",
      time: new Date().toISOString(),
    };

    // Fire-and-forget, but kept alive via waitUntil so the runtime can't
    // tear down the invocation before the write actually lands.
    event.waitUntil(
      redis
        .rpush("portfolio:visits", JSON.stringify(visit))
        .catch((err) => console.error("Visit logging failed:", err)),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      /*
       * Match all request paths except:
       * - api routes
       * - _next/static, _next/image (build assets)
       * - favicon, robots.txt, sitemap.xml
       * - files with an extension (images, pdfs, etc. in /public)
       */
      source: "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
      // Exclude Next.js's own automatic link-hover/viewport prefetches —
      // otherwise every prefetched card in the work grid counts as a "visit"
      // the visitor never actually looked at.
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
