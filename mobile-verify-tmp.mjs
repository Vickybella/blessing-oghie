import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
await page.goto("http://localhost:3000", { waitUntil: "load" });
await page.waitForTimeout(800);
await page.screenshot({ path: "/tmp/hero-real-viewport.png" });
await browser.close();
