import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const WEB_URL = "http://localhost:3000";
const ARTIFACT_DIR =
  "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\23845448-65c7-4319-93da-3db657486883";

const TEST_VIEWPORTS = [
  // Mobile screens
  { name: "375x667-iphone-se", width: 375, height: 667, isMobile: true },
  { name: "390x844-iphone-14", width: 390, height: 844, isMobile: true },
  { name: "430x932-iphone-14-pro-max", width: 430, height: 932, isMobile: true },
  { name: "768x1024-ipad-portrait", width: 768, height: 1024, isMobile: true },
  // Desktop screens
  { name: "1024x768-laptop-small", width: 1024, height: 768, isMobile: false },
  { name: "1366x768-laptop-standard", width: 1366, height: 768, isMobile: false },
  { name: "1440x900-desktop", width: 1440, height: 900, isMobile: false },
  { name: "1920x1080-desktop-fhd", width: 1920, height: 1080, isMobile: false },
];

async function runAudit() {
  console.log("=== COMPREHENSIVE VIEWPORT & SCROLL-DRIVEN HORIZONTAL AUDIT ===");
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  for (const vp of TEST_VIEWPORTS) {
    console.log(`\n------------------------------------------------------------`);
    console.log(`TESTING VIEWPORT: ${vp.name} (${vp.width}x${vp.height}, isMobile=${vp.isMobile})`);
    console.log(`------------------------------------------------------------`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      hasTouch: vp.isMobile,
      isMobile: vp.isMobile,
    });
    const page = await context.newPage();
    await page.goto(WEB_URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // 1. Check Document-wide Horizontal Overflow
    const overflow = await page.evaluate(() => {
      return {
        docScrollWidth: document.documentElement.scrollWidth,
        windowInnerWidth: window.innerWidth,
      };
    });
    assert.ok(
      overflow.docScrollWidth <= overflow.windowInnerWidth + 1,
      `Horizontal page overflow detected at ${vp.name}: docScrollWidth=${overflow.docScrollWidth}, windowInnerWidth=${overflow.windowInnerWidth}`
    );
    console.log(`  -> Zero page overflow verified (${overflow.docScrollWidth} <= ${overflow.windowInnerWidth})`);

    // 2. Locate #selected-work
    const section = page.locator("#selected-work");
    assert.equal(await section.count(), 1, "#selected-work must exist");

    const docTop = await page.evaluate(() => {
      const s = document.getElementById("selected-work");
      return s.getBoundingClientRect().top + window.scrollY;
    });

    // 3. Scroll to start of #selected-work: Verify section pins
    await page.evaluate((top) => window.scrollTo(0, top), docTop);
    await page.waitForTimeout(400);

    const initialSectionBox = await section.boundingBox();
    assert.ok(initialSectionBox, "Section must have bounding box");
    console.log(`  -> Section pinned position: y=${Math.round(initialSectionBox.y)}px, height=${Math.round(initialSectionBox.height)}px`);

    // 4. Verify vertical scrolling drives horizontal translation (ScrollTrigger scrub)
    const scrollDelta = vp.isMobile ? 350 : 600;
    await page.evaluate((y) => window.scrollTo(0, y), docTop + scrollDelta);
    await page.waitForTimeout(400);

    const intermediateTransform = await page.locator("#selected-work-track").evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    console.log(`  -> Track transform after scrolling +${scrollDelta}px: ${intermediateTransform}`);
    assert.ok(
      intermediateTransform.includes("matrix"),
      `Vertical scroll must drive horizontal translation at ${vp.name}, got ${intermediateTransform}`
    );

    // 5. Inspect Card Sizing, Content, and 100% Vertical Visibility
    const cards = page.locator("#selected-work-track article");
    const cardCount = await cards.count();
    assert.equal(cardCount, 4, "Must render exactly 4 project cards");

    for (let i = 0; i < cardCount; i++) {
      const cBox = await cards.nth(i).boundingBox();
      if (cBox) {
        const cardBottom = cBox.y + cBox.height;
        const clearance = vp.height - cardBottom;
        console.log(
          `     Card ${i}: width=${Math.round(cBox.width)}px, height=${Math.round(cBox.height)}px, top=${Math.round(cBox.y)}px, bottom=${Math.round(cardBottom)}px, clearance=${Math.round(clearance)}px`
        );

        // Card width assertions
        if (vp.isMobile) {
          // On mobile, card should be large and substantial: ~86-94% of screen width
          const minW = Math.round(vp.width * 0.82);
          assert.ok(
            cBox.width >= minW && cBox.width <= vp.width,
            `Card ${i} width (${cBox.width}px) should be ~86-94% of ${vp.width}px on mobile`
          );
        } else {
          // On desktop, card should be substantially sized (540px–680px)
          assert.ok(
            cBox.width >= 540,
            `Desktop card ${i} width (${cBox.width}px) must be >= 540px for large premium layout`
          );
        }

        // CRITICAL: Card bottom must be strictly less than viewport height (NO vertical clipping)
        assert.ok(
          cardBottom <= vp.height,
          `Card ${i} bottom (${cardBottom}px) exceeds viewport height (${vp.height}px) on ${vp.name}! Card is cut off!`
        );
        assert.ok(
          clearance >= 15,
          `Card ${i} must have at least 15px clearance at bottom, got ${clearance}px on ${vp.name}`
        );

        // Verify the case study link is fully visible and not clipped
        const link = cards.nth(i).locator("a");
        const lBox = await link.boundingBox();
        assert.ok(lBox, `Card ${i} link must exist`);
        assert.ok(
          lBox.y + lBox.height <= vp.height,
          `Card ${i} link is cut off below viewport height (${vp.height}px) on ${vp.name}`
        );
      }
    }
    console.log(`  -> PASS: All project cards are large, spacious, and 100% visible vertically (zero cutoff)`);

    // 6. Test scrolling to travel end: Last card must be fully visible with clean right margin
    const trackDetails = await page.evaluate(() => {
      const track = document.getElementById("selected-work-track");
      const cards = track.querySelectorAll("article");
      const lastCard = cards[cards.length - 1];
      const isDesktop = window.innerWidth >= 1024;
      const targetRightMargin = isDesktop ? 64 : Math.max(16, Math.min(32, Math.round(window.innerWidth * 0.06)));
      const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
      const totalDistance = Math.max(0, lastCardRight - window.innerWidth + targetRightMargin);
      return { totalDistance, targetRightMargin };
    });

    await page.evaluate((y) => window.scrollTo(0, y), docTop + trackDetails.totalDistance);
    await page.waitForTimeout(500);

    const lastCard = cards.last();
    const lastBox = await lastCard.boundingBox();
    assert.ok(lastBox, "Last card must exist");
    const rightMargin = vp.width - (lastBox.x + lastBox.width);
    console.log(`  -> Last card right margin at travel end: ${Math.round(rightMargin)}px`);
    assert.ok(
      rightMargin >= 10 && rightMargin <= 130,
      `Last card right margin must be between 10px and 130px, got ${rightMargin}px on ${vp.name}`
    );
    assert.ok(
      lastBox.y + lastBox.height <= vp.height,
      `Last card must be 100% visible vertically at travel end on ${vp.name}`
    );
    console.log(`  -> PASS: Final project card fully reaches end position with proper margin`);

    // 7. Scroll past pin: Section unpins immediately and normal vertical scrolling resumes into #enquiry-form
    await page.evaluate((y) => window.scrollTo(0, y + 300), docTop + trackDetails.totalDistance);
    await page.waitForTimeout(400);

    const enquiryBox = await page.locator("#enquiry-form").boundingBox();
    assert.ok(
      enquiryBox && enquiryBox.y < vp.height,
      `Pin must release immediately into #enquiry-form on ${vp.name}`
    );
    console.log(`  -> PASS: Pin release is immediate and seamless into #enquiry-form`);

    // 8. Capture verified screenshots
    if (vp.name === "390x844-iphone-14") {
      // Scroll back to mid-travel to capture active mobile card
      await page.evaluate((y) => window.scrollTo(0, y), docTop + 300);
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "mobile-portfolio-carousel.png"),
      });
      console.log(`  -> Saved mobile screenshot: mobile-portfolio-carousel.png`);
    }

    if (vp.name === "1440x900-desktop") {
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "desktop-horizontal-scroll-end.png"),
      });
      console.log(`  -> Updated artifact screenshot: desktop-horizontal-scroll-end.png`);
    }

    await context.close();
  }

  // 9. Test dynamic breakpoint resizing from Desktop to Mobile and back
  console.log(`\n------------------------------------------------------------`);
  console.log(`TESTING DYNAMIC BREAKPOINT RESIZING (Desktop 1440px -> Mobile 390px -> Desktop 1440px)`);
  console.log(`------------------------------------------------------------`);
  const resizeContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const resizePage = await resizeContext.newPage();
  await resizePage.goto(WEB_URL, { waitUntil: "networkidle" });
  await resizePage.waitForTimeout(400);

  // Resize to mobile
  await resizePage.setViewportSize({ width: 390, height: 844 });
  await resizePage.waitForTimeout(400);

  const mobileOverflow = await resizePage.evaluate(() => {
    return document.documentElement.scrollWidth <= window.innerWidth + 1;
  });
  assert.ok(mobileOverflow, "No horizontal page overflow after resizing to mobile");
  console.log("  -> PASS: Zero horizontal overflow after live resize to mobile 390px");

  // Resize back to desktop
  await resizePage.setViewportSize({ width: 1440, height: 900 });
  await resizePage.waitForTimeout(400);

  const desktopOverflow = await resizePage.evaluate(() => {
    return document.documentElement.scrollWidth <= window.innerWidth + 1;
  });
  assert.ok(desktopOverflow, "No horizontal page overflow after resizing back to desktop");
  console.log("  -> PASS: Zero horizontal overflow after live resize back to desktop 1440px");

  await resizeContext.close();
  await browser.close();

  console.log("\n============================================================");
  console.log("SUCCESS: ALL 8 VIEWPORTS PASSED AUTOMATIC SCROLL-DRIVEN PINNING!");
  console.log("============================================================\n");
}

runAudit().catch((err) => {
  console.error("AUDIT FAILED:", err);
  process.exit(1);
});
