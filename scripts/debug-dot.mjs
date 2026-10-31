import { chromium } from "playwright-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function test() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 375, height: 667 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  await page.locator("#selected-work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const dots = page.locator("#selected-work button[aria-label^='Go to project slide']");
  const count = await dots.count();
  console.log("Dots count:", count);
  for (let i = 0; i < count; i++) {
    console.log(`Dot ${i} visible:`, await dots.nth(i).isVisible(), "box:", await dots.nth(i).boundingBox());
  }

  const track = page.locator("#selected-work-track");
  console.log("Initial track scrollLeft:", await track.evaluate((el) => el.scrollLeft));

  await dots.nth(1).click();
  await page.waitForTimeout(600);
  console.log("After click dot 1 track scrollLeft:", await track.evaluate((el) => el.scrollLeft));

  const card1 = page.locator("#selected-work-track article").nth(1);
  console.log("Card 1 offsetLeft in track:", await card1.evaluate((el) => el.offsetLeft));

  await browser.close();
}

test();
