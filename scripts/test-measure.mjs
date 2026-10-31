import { chromium } from "playwright-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function test() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  console.log("=== DESKTOP 1440x900 ===");
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.evaluate(() => document.getElementById("selected-work")?.scrollIntoView());
  await page.waitForTimeout(600);

  const sectionBox = await page.locator("#selected-work").boundingBox();
  console.log("Section bounding box:", sectionBox);

  const cards = await page.locator(".project-panel-inner").all();
  console.log("Desktop cards count:", cards.length);
  for (let i = 0; i < cards.length; i++) {
    const box = await cards[i].boundingBox();
    console.log(`Card ${i} box:`, box);
    if (box) {
      console.log(`  Card ${i} bottom relative to viewport (height 900): ${box.y + box.height}`);
      console.log(`  Visible vertical height: ${Math.min(900, box.y + box.height) - Math.max(0, box.y)} / ${box.height} (${Math.round(((Math.min(900, box.y + box.height) - Math.max(0, box.y)) / box.height) * 100)}%)`);
      console.log(`  Visible horizontal width: ${Math.min(1440, box.x + box.width) - Math.max(0, box.x)} / ${box.width} (${Math.round(((Math.min(1440, box.x + box.width) - Math.max(0, box.x)) / box.width) * 100)}%)`);
    }
  }

  console.log("\n=== LAPTOP 1024x768 ===");
  const pageLaptop = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await pageLaptop.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await pageLaptop.evaluate(() => document.getElementById("selected-work")?.scrollIntoView());
  await pageLaptop.waitForTimeout(600);

  const laptopCards = await pageLaptop.locator(".project-panel-inner").all();
  for (let i = 0; i < laptopCards.length; i++) {
    const box = await laptopCards[i].boundingBox();
    console.log(`Laptop Card ${i} box:`, box);
    if (box) {
      console.log(`  Laptop Card ${i} bottom relative to viewport (height 768): ${box.y + box.height}`);
      console.log(`  Visible vertical height: ${Math.min(768, box.y + box.height) - Math.max(0, box.y)} / ${box.height} (${Math.round(((Math.min(768, box.y + box.height) - Math.max(0, box.y)) / box.height) * 100)}%)`);
      console.log(`  Visible horizontal width: ${Math.min(1024, box.x + box.width) - Math.max(0, box.x)} / ${box.width} (${Math.round(((Math.min(1024, box.x + box.width) - Math.max(0, box.x)) / box.width) * 100)}%)`);
    }
  }

  console.log("\n=== MOBILE 390x844 ===");
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await pageMobile.evaluate(() => document.getElementById("selected-work")?.scrollIntoView());
  await pageMobile.waitForTimeout(600);

  const mobileCards = await pageMobile.locator("#selected-work article").all();
  console.log("Mobile cards count:", mobileCards.length);
  for (let i = 0; i < mobileCards.length; i++) {
    const box = await mobileCards[i].boundingBox();
    console.log(`Mobile Card ${i} box:`, box);
  }

  await browser.close();
}

test();
