import { chromium } from "playwright";

const widths = [320, 360, 375, 390, 414, 428];
const url = process.argv[2] || "http://localhost:3000";

const browser = await chromium.launch();

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(async () => {
    const distance = 350;
    let total = 0;
    const scrollHeight = document.body.scrollHeight;
    while (total < scrollHeight) {
      window.scrollBy(0, distance);
      total += distance;
      await new Promise((r) => setTimeout(r, 200));
    }
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  const overflowResult = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const winWidth = window.innerWidth;
    const offenders = [];
    if (docWidth > winWidth) {
      document.querySelectorAll("body *").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if ((rect.right > winWidth + 1 || rect.left < -1) && rect.width > 0) {
          offenders.push({
            tag: el.tagName,
            cls: typeof el.className === "string" ? el.className.slice(0, 100) : "",
            left: Math.round(rect.left),
            right: Math.round(rect.right),
          });
        }
      });
    }
    return { docWidth, winWidth, offenders: offenders.slice(0, 10) };
  });

  console.log(`\n=== width ${width} ===`);
  console.log(`docWidth=${overflowResult.docWidth} winWidth=${overflowResult.winWidth}`);
  if (overflowResult.offenders.length) {
    console.log("OVERFLOW OFFENDERS:", JSON.stringify(overflowResult.offenders, null, 2));
  }

  await page.screenshot({ path: `/tmp/mobile-${width}-full.png`, fullPage: true });
  await page.close();
}

await browser.close();
console.log("\ndone");
