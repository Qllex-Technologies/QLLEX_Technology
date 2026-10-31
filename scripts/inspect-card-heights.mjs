import { chromium } from "playwright-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const WEB_URL = "http://localhost:3000";

async function inspect() {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });

  const viewports = [
    { name: "375x667", width: 375, height: 667, isMobile: true },
    { name: "390x844", width: 390, height: 844, isMobile: true },
    { name: "1366x768", width: 1366, height: 768, isMobile: false },
  ];

  for (const vp of viewports) {
    console.log(`\n================== ${vp.name} ==================`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      hasTouch: vp.isMobile,
      isMobile: vp.isMobile,
    });
    const page = await context.newPage();
    await page.goto(WEB_URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const docTop = await page.evaluate(() => {
      const s = document.getElementById("selected-work");
      return s.getBoundingClientRect().top + window.scrollY;
    });

    console.log(`docTop for #selected-work: ${docTop}`);

    // Pinning point:
    await page.evaluate((top) => window.scrollTo(0, top), docTop);
    await page.waitForTimeout(500);

    const data = await page.evaluate(() => {
      const header = document.querySelector("header");
      const section = document.getElementById("selected-work");
      const headingBox = section.querySelector(".mx-auto");
      const container = document.getElementById("selected-work-container");
      const track = document.getElementById("selected-work-track");
      const firstCard = track.querySelector("article");
      const cardHeader = firstCard.querySelector(".border-b");
      const cardArt = firstCard.querySelector(".relative.overflow-hidden");
      const cardTitle = firstCard.querySelector("h3");
      const cardSummary = firstCard.querySelector("p");
      const cardFooter = firstCard.querySelector(".mt-4.pt-3");

      const getRect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: r.top, bottom: r.bottom, height: r.height, y: r.y };
      };

      return {
        windowInnerHeight: window.innerHeight,
        header: getRect(header),
        section: getRect(section),
        headingBox: getRect(headingBox),
        container: getRect(container),
        firstCard: getRect(firstCard),
        cardHeader: getRect(cardHeader),
        cardArt: getRect(cardArt),
        cardTitle: getRect(cardTitle),
        cardSummary: getRect(cardSummary),
        cardFooter: getRect(cardFooter),
        sectionComputedPadding: {
          paddingTop: window.getComputedStyle(section).paddingTop,
          paddingBottom: window.getComputedStyle(section).paddingBottom,
        },
      };
    });

    console.log("Measurements at start of pin:", JSON.stringify(data, null, 2));

    // Also take screenshot of the initial pin state and mid pin state
    await page.screenshot({ path: `C:\\WEBSITE\\nexovanta\\scripts\\inspect-${vp.name}-pin-start.png` });

    // Scroll 200px down:
    await page.evaluate((top) => window.scrollTo(0, top + 200), docTop);
    await page.waitForTimeout(400);

    const midData = await page.evaluate(() => {
      const firstCard = document.querySelector("#selected-work-track article");
      const r = firstCard.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height, y: r.y, windowInnerHeight: window.innerHeight };
    });
    console.log("Measurements at +200px scroll:", JSON.stringify(midData, null, 2));

    await page.screenshot({ path: `C:\\WEBSITE\\nexovanta\\scripts\\inspect-${vp.name}-mid.png` });
    await context.close();
  }

  await browser.close();
}

inspect().catch(console.error);
