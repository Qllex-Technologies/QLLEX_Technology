import { chromium } from "playwright-core";

async function main() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const section = await page.$("#selected-work");
  const track = await page.$("#selected-work [class*='flex flex-nowrap']");

  const initialY = await page.evaluate(() => {
    const el = document.getElementById("selected-work");
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY;
  });
  console.log("Absolute section top Y:", initialY);

  const initialTransform = await track.evaluate((el) => window.getComputedStyle(el).transform);
  console.log("Initial transform at top:", initialTransform);

  // Scroll to section start
  await page.evaluate((y) => window.scrollTo(0, y), initialY);
  await page.waitForTimeout(500);
  const atStartTransform = await track.evaluate((el) => window.getComputedStyle(el).transform);
  console.log("Transform at section start (scrollY = " + initialY + "):", atStartTransform);

  // Scroll 400px past section start
  await page.evaluate((y) => window.scrollTo(0, y + 400), initialY);
  await page.waitForTimeout(500);
  const at400Transform = await track.evaluate((el) => window.getComputedStyle(el).transform);
  console.log("Transform at section + 400px:", at400Transform);

  // Scroll 1000px past section start
  await page.evaluate((y) => window.scrollTo(0, y + 1000), initialY);
  await page.waitForTimeout(500);
  const at1000Transform = await track.evaluate((el) => window.getComputedStyle(el).transform);
  console.log("Transform at section + 1000px:", at1000Transform);

  // Take screenshot at + 400px
  await page.screenshot({ path: "scripts/test-scroll-400.png" });

  await browser.close();
}

main().catch(console.error);
