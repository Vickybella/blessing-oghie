// Generates public/portfolio.pdf as a real, full-page capture of the live
// homepage — not a hand-authored summary. Every section, in the order it
// actually renders on the site. Run automatically after every `npm run
// build` (see the "postbuild" script in package.json) so the PDF can never
// drift out of sync with the real page.
//
// Manual run: BASE_URL=http://localhost:3000 node scripts/generate-portfolio-pdf.mjs
// (if BASE_URL is omitted, this script starts its own `next start` server)

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const outputPath = path.join(rootDir, "public", "portfolio.pdf");

const externalBaseUrl = process.env.BASE_URL;
const PORT = 4173;

function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        // not up yet
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Server at ${url} did not become ready in time`));
        return;
      }
      setTimeout(tick, 500);
    };
    tick();
  });
}

// Back to the real desktop layout for the capture.
const CAPTURE_WIDTH = 1440;

async function generate(baseUrl) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: CAPTURE_WIDTH, height: 900 } });

  // ?static=1 tells Hero to skip Framer Motion's invisible entrance state
  // entirely (see the useSkipEntranceAnimation comment in components/hero.tsx)
  // instead of trying to erase it after the fact once React has already set it.
  const separator = baseUrl.includes("?") ? "&" : "?";
  await page.goto(`${baseUrl}${separator}static=1`, { waitUntil: "load" });

  // Neutralize the scroll-triggered reveal animations (Framer Motion
  // `whileInView`) and anything fixed/decorative that doesn't belong in a
  // printed capture — everything should render fully visible, once, in
  // document order.
  //
  // The hero is a deliberate exception: live, its grid puts the copy and
  // the portrait side by side with the portrait column set to viewport
  // height (lg:min-h-[calc(100svh-4rem)]) — flattened into a single tall
  // PDF page that both broke the two-column layout's rendering and
  // cropped the top of her head. Stacking the portrait under the copy
  // sidesteps both: full width, a fixed reasonable height instead of a
  // viewport-relative one, object-cover crops evenly top/bottom instead
  // of cutting off the top.
  //
  // Instagram embeds and YouTube iframes (the Creative Lab reel) rely on
  // cross-origin scripts/players that never load in a single headless
  // snapshot — components/creative-lab-reel.tsx renders a real poster
  // image + real clickable link for each one behind [data-pdf-only]
  // (hidden live), with the live embed/iframe behind [data-live-only]
  // (hidden here) so the PDF shows real content instead of a blank box.
  await page.addStyleTag({
    content: `
      * {
        opacity: 1 !important;
        transform: none !important;
        animation: none !important;
        transition: none !important;
      }
      header, nav { position: static !important; }
      .grain { display: none !important; }
      [data-hero-grid] { display: block !important; }
      [data-hero-portrait] { min-height: 640px !important; height: 640px !important; margin-top: 24px; }
      [data-live-only] { display: none !important; }
      [data-pdf-only] { display: block !important; }
      .instagram-media { display: none !important; }
      * {
        mix-blend-mode: normal !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
      /* Confirmed root cause (a page.screenshot() at the identical point
         renders everything correctly, so it was never mix-blend-mode,
         backdrop-filter, or animation timing): Chromium's page.pdf()
         rasterizer silently drops complex content — text, photos — on an
         extremely tall, non-standard single custom page size (the whole
         page flattened into one ~12,000-20,000px-tall page), while still
         painting simple flat backgrounds. A normal page height (tested at
         2000px) renders correctly. So: real, reasonably-sized pages,
         with break-inside:avoid on anything image/card-shaped so a page
         boundary never lands mid-element — the actual problem the giant
         single page was trying (and failing) to solve. */
      img, picture, video, iframe, blockquote {
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .card-hover, [class*="rounded-2xl"], [class*="rounded-xl"] {
        break-inside: avoid;
        page-break-inside: avoid;
      }
    `,
  });

  await page.evaluate(() => document.fonts.ready);

  // Belt-and-suspenders on top of the !important stylesheet above: Chromium's
  // print pipeline (used by page.pdf()) can still render a Framer Motion
  // element's JS-set inline opacity/transform as-is even when a stylesheet
  // rule says otherwise, leaving whole sections (the hero text, the
  // portrait) invisible in the exported PDF while looking fine on-screen.
  //
  // A one-shot clear isn't enough: on the production server, hydration and
  // Framer Motion's mount animation can fire LATER than expected, re-setting
  // opacity:0 again after we've already cleared it once. A MutationObserver
  // that keeps stripping the inline properties for as long as the page is
  // settling — instead of clearing at just one or two fixed moments — wins
  // that race regardless of when hydration actually happens.
  await page.evaluate(() => {
    const strip = (el) => {
      if (!(el instanceof HTMLElement)) return;
      el.style.removeProperty("opacity");
      el.style.removeProperty("transform");
    };
    document.querySelectorAll("*").forEach(strip);
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) strip(m.target);
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
      subtree: true,
    });
    window.__stopMotionStrip = () => observer.disconnect();
  });

  // Scroll the full height first so anything gated behind an
  // IntersectionObserver (image existence probes, viewport-triggered
  // components) has already resolved before we capture.
  await page.evaluate(async () => {
    const distance = 600;
    const delay = 120;
    let total = 0;
    const scrollHeight = document.body.scrollHeight;
    while (total < scrollHeight) {
      window.scrollBy(0, distance);
      total += distance;
      await new Promise((r) => setTimeout(r, delay));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);

  // Give hydration/animations one more moment to settle, then do a final
  // manual sweep and stop the observer right before the capture — nothing
  // should still be writing to style attributes by this point.
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      el.style.removeProperty("opacity");
      el.style.removeProperty("transform");
    });
    window.__stopMotionStrip?.();
  });

  // The [data-pdf-only] poster images (Instagram/YouTube fallbacks) and
  // every other <img> on the page load over the network — a fixed
  // timeout above is not a guarantee they've actually finished by now,
  // especially a cross-origin photo that was hidden (display:none) until
  // the stylesheet above just revealed it. Wait for every image to
  // actually finish loading and decode before handing the page to the
  // print pipeline, so nothing captures half-loaded or blank.
  await page.evaluate(async () => {
    const images = Array.from(document.images);
    await Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalWidth > 0) return img.decode().catch(() => {});
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        }).then(() => img.decode().catch(() => {}));
      }),
    );
  });

  // Real, normal-sized pages (confirmed to render correctly), matching the
  // capture width's proportions rather than A4's — the break-inside:avoid
  // rules above are what actually stops content being sliced across the
  // page boundaries this creates, not avoiding pagination altogether.
  await page.pdf({
    path: outputPath,
    width: `${CAPTURE_WIDTH}px`,
    height: `${Math.round(CAPTURE_WIDTH * 1.414)}px`,
    printBackground: true,
    margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
  });

  await browser.close();
}

async function main() {
  if (externalBaseUrl) {
    console.log(`[portfolio-pdf] Using existing server at ${externalBaseUrl}`);
    await generate(externalBaseUrl);
    console.log(`[portfolio-pdf] Saved ${outputPath}`);
    return;
  }

  console.log("[portfolio-pdf] Starting a production server for capture...");
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: rootDir,
    stdio: "inherit",
  });

  const shutdown = () => {
    if (!server.killed) server.kill();
  };
  process.on("exit", shutdown);

  try {
    const url = `http://localhost:${PORT}`;
    await waitForServer(url);
    await generate(url);
    console.log(`[portfolio-pdf] Saved ${outputPath}`);
  } finally {
    shutdown();
  }
}

// Non-fatal: the PDF is a nice-to-have export, not build-critical. A missing
// Chromium binary or a flaky capture shouldn't take down the whole deploy —
// the previously committed public/portfolio.pdf just stays in place.
main().catch((err) => {
  console.error("[portfolio-pdf] Failed, keeping existing public/portfolio.pdf:", err);
});
