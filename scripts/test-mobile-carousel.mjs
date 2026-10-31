import { chromium } from "playwright-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function test() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  await page.locator("#selected-work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  const carousel = page.locator("#selected-work .overflow-x-auto");
  console.log("Mobile carousel found:", await carousel.count());

  const initialScrollLeft = await carousel.evaluate((el) => el.scrollLeft);
  console.log("Initial scrollLeft:", initialScrollLeft);

  const dots = page.locator("#selected-work button[aria-label^='Go to project slide']");
  console.log("Dots found:", await dots.count());

  // Click dot 2 (3rd card)
  await dots.nth(2).click();
  await page.waitForTimeout(700);
  const scrollAfterDot2 = await carousel.evaluate((el) => el.scrollLeft);
  console.log("scrollLeft after clicking dot 2:", Math.round(scrollAfterDot2));

  // Click Next button
  const nextBtn = page.locator("#selected-work button[aria-label='Next project']");
  await nextBtn.click();
  await page.waitForTimeout(700);
  const scrollAfterNext = await carousel.evaluate((el) => el.scrollLeft);
  console.log("scrollLeft after clicking Next button:", Math.round(scrollAfterNext));

  // Click Prev button
  const prevBtn = page.locator("#selected-work button[aria-label='Previous project']");
  await prevBtn.click();
  await page.waitForTimeout(700);
  const scrollAfterPrev = await carousel.evaluate((el) => el.scrollLeft);
  console.log("scrollLeft after clicking Prev button:", Math.round(scrollAfterPrev));

  // Native touch / smooth scroll to 2nd card
  await carousel.evaluate((el) => el.scrollTo({ left: 350, behavior: "smooth" }));
  await page.waitForTimeout(700);
  const scrollAfterSmooth = await carousel.evaluate((el) => el.scrollLeft);
  console.log("scrollLeft after native smooth scroll:", Math.round(scrollAfterSmooth));

  // Page horizontal overflow check
  const hasPageOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log("Has page horizontal overflow on 390px mobile:", hasPageOverflow);

  await browser.close();
}

test();
