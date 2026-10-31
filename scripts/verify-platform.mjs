/**
 * QLLEX TECHNOLOGIES — AUTOMATED END-TO-END VERIFICATION SUITE
 * Validates backend APIs, database persistence, admin auth, and the 8 essential frontend pages.
 */

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { validateEnv } = require("../apps/api/dist/config/env.js");

const ROOT_DIR = path.resolve(import.meta.dirname, "..");
const WEB_DIR = path.join(ROOT_DIR, "apps", "web");
const API_URL = "http://127.0.0.1:4000/api/v1";
const WEB_URL = "http://127.0.0.1:3000";

const ESSENTIAL_ROUTES = [
  "/",
  "/services",
  "/technologies",
  "/portfolio",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/admin",
];

async function isServerRunning(url) {
  try {
    const res = await fetch(url);
    return res.status < 500;
  } catch {
    return false;
  }
}

async function waitForUrl(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isServerRunning(url)) return;
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function runTests() {
  console.log("=== STARTING QLLEX TECHNOLOGIES END-TO-END VERIFICATION ===\n");

  let apiProc = null;
  let webProc = null;

  const apiAlreadyRunning = await isServerRunning(`${API_URL}/health`);
  const webAlreadyRunning = await isServerRunning(`${WEB_URL}/`);

  if (!apiAlreadyRunning) {
    console.log("Spawning API server for test suite...");
    apiProc = spawn(
      process.execPath,
      [path.join(ROOT_DIR, "apps/api/dist/index.js")],
      { cwd: ROOT_DIR, stdio: "pipe" }
    );
  } else {
    console.log("Connected to existing active API server on port 4000.");
  }

  if (!webAlreadyRunning) {
    console.log("Spawning Web server for test suite...");
    webProc = spawn(
      process.execPath,
      [
        path.join(ROOT_DIR, "node_modules/next/dist/bin/next"),
        "start",
        "-p",
        "3000",
      ],
      { cwd: WEB_DIR, stdio: "pipe" }
    );
  } else {
    console.log("Connected to existing active Web server on port 3000.");
  }

  try {
    await Promise.all([
      waitForUrl(`${API_URL}/health`),
      waitForUrl(`${WEB_URL}/`),
    ]);

    // 1. Test missing / insecure production environment variables
    console.log("[1/6] Testing production environment variable validation...");
    let threwProdError = false;
    try {
      validateEnv({
        NODE_ENV: "production",
        MONGODB_URI: "mongodb://127.0.0.1:27017/nexovanta_db",
        JWT_SECRET: "short",
      });
    } catch {
      threwProdError = true;
      console.log(
        "  -> PASS: Production env validator rejected insecure/short JWT secret"
      );
    }
    assert.ok(
      threwProdError,
      "Expected validateEnv to throw on insecure production secret"
    );

    // 2. Test Contact Form Validation & Persistence
    console.log("\n[2/6] Testing Contact Form validation & persistence...");
    const badContactRes = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "A",
        email: "not-an-email",
        serviceRequired: "invalid",
        projectDescription: "too short",
      }),
    });
    assert.equal(
      badContactRes.status,
      400,
      "Expected 400 on malformed contact submission"
    );
    const badContactJson = await badContactRes.json();
    assert.equal(badContactJson.success, false);
    console.log("  -> PASS: Invalid contact payload rejected with HTTP 400");

    const validContactPayload = {
      fullName: "Elena Rostova",
      email: `elena.${Date.now()}@quantumscale.example.com`,
      phoneNumber: "+1 415 555 2671",
      serviceRequired: "Custom Software Development",
      estimatedBudget: "$25,000 – $50,000",
      projectDescription:
        "Architecting an enterprise microservices data processing platform.",
      websiteUrl: "", // Honeypot must be empty
    };

    const goodContactRes = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validContactPayload),
    });
    assert.equal(
      goodContactRes.status,
      201,
      "Expected 201 on valid contact submission"
    );
    const goodContactJson = await goodContactRes.json();
    assert.ok(
      goodContactJson.data.referenceId,
      "Expected enquiry referenceId"
    );
    console.log(
      `  -> PASS: Valid contact stored in MongoDB (Reference ID: ${goodContactJson.data.referenceId})`
    );

    // 3. Test Database Failure Handling
    console.log("\n[3/6] Testing database failure handling (HTTP 503)...");
    const dbFailRes = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-simulate-db-failure": "true",
      },
      body: JSON.stringify({
        ...validContactPayload,
        email: `failtest.${Date.now()}@example.com`,
      }),
    });
    assert.equal(
      dbFailRes.status,
      503,
      "Expected 503 when database is unavailable"
    );
    const dbFailJson = await dbFailRes.json();
    assert.equal(dbFailJson.success, false);
    console.log(
      "  -> PASS: Database failure cleanly returned HTTP 503:",
      dbFailJson.message
    );

    // 4. Test Admin Authorization & CMS Workflows
    console.log("\n[4/6] Testing Admin authorization & CMS workflows...");
    const unauthRes = await fetch(`${API_URL}/admin/overview`);
    assert.equal(
      unauthRes.status,
      401,
      "Expected 401 for unauthenticated admin request"
    );
    console.log("  -> PASS: Unauthenticated /admin/overview blocked with HTTP 401");

    const badLoginRes = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@qllex.example.com",
        password: "WrongPassword123!",
      }),
    });
    assert.equal(
      badLoginRes.status,
      401,
      "Expected 401 on wrong admin password"
    );
    console.log("  -> PASS: Invalid admin password rejected with HTTP 401");

    const goodLoginRes = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@qllex.example.com",
        password: "ChangeMeInProduction!2026",
      }),
    });
    assert.equal(goodLoginRes.status, 200, "Expected 200 on valid admin login");
    const loginJson = await goodLoginRes.json();
    const token = loginJson.data.token;
    assert.ok(token, "Expected JWT token");

    const overviewRes = await fetch(`${API_URL}/admin/overview`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.equal(
      overviewRes.status,
      200,
      "Expected 200 on authenticated /admin/overview"
    );
    const overviewJson = await overviewRes.json();
    assert.ok(
      overviewJson.data.stats.totalEnquiries >= 1,
      "Expected saved enquiry in admin overview"
    );
    console.log(
      `  -> PASS: Admin CMS verified (Total Enquiries = ${overviewJson.data.stats.totalEnquiries})`
    );

    // 5. Test All 8 Essential Frontend Routes, SEO Metadata, Single H1, JSON-LD
    console.log(
      "\n[5/6] Auditing all 8 essential Next.js routes, SEO metadata, H1 hierarchy & JSON-LD..."
    );
    const titlesSeen = new Set();

    for (const route of ESSENTIAL_ROUTES) {
      const res = await fetch(`${WEB_URL}${route}`);
      assert.equal(
        res.status,
        200,
        `Expected route ${route} to return HTTP 200, got ${res.status}`
      );
      const html = await res.text();

      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      assert.ok(
        titleMatch && titleMatch[1].length > 5,
        `Missing <title> on ${route}`
      );

      const descMatch = html.match(
        /<meta\s+name="description"\s+content="([^"]+)"/i
      );
      assert.ok(
        descMatch && descMatch[1].length > 20,
        `Missing meta description on ${route}`
      );

      const canonicalMatch = html.match(
        /<link\s+rel="canonical"\s+href="([^"]+)"/i
      );
      assert.ok(canonicalMatch, `Missing canonical URL on ${route}`);

      const h1Matches = html.match(/<h1[\s>]/gi) || [];
      assert.equal(
        h1Matches.length,
        1,
        `Expected exactly 1 <h1> on ${route}, found ${h1Matches.length}`
      );

      if (route !== "/admin") {
        assert.ok(
          !html.includes('content="noindex'),
          `Public route ${route} must not contain noindex directive`
        );
        assert.ok(
          !titlesSeen.has(titleMatch[1]),
          `Duplicate page <title> detected on ${route}: ${titleMatch[1]}`
        );
        titlesSeen.add(titleMatch[1]);
      }

      assert.ok(
        html.includes("application/ld+json"),
        `Missing JSON-LD structured data on ${route}`
      );
      console.log(`  -> PASS: Route ${route} verified`);
    }

    // 6. Test 404, Sitemap, and Robots.txt
    console.log("\n[6/6] Auditing 404 handler, sitemap.xml & robots.txt...");
    const res404 = await fetch(`${WEB_URL}/non-existent-route-check-404`);
    assert.equal(
      res404.status,
      404,
      "Expected custom 404 page to return HTTP 404"
    );
    console.log("  -> PASS: Custom 404 page returned HTTP 404");

    const sitemapRes = await fetch(`${WEB_URL}/sitemap.xml`);
    assert.equal(sitemapRes.status, 200, "Expected /sitemap.xml to return 200");
    const sitemapXml = await sitemapRes.text();
    assert.ok(
      sitemapXml.includes("<urlset") && sitemapXml.includes("/services"),
      "Invalid sitemap.xml content"
    );
    console.log("  -> PASS: /sitemap.xml valid and populated");

    const robotsRes = await fetch(`${WEB_URL}/robots.txt`);
    assert.equal(robotsRes.status, 200, "Expected /robots.txt to return 200");
    const robotsTxt = await robotsRes.text();
    assert.ok(
      robotsTxt.includes("Sitemap:") && robotsTxt.includes("Disallow: /admin"),
      "Invalid robots.txt content"
    );
    console.log("  -> PASS: /robots.txt valid");

    console.log("\n=== ALL END-TO-END VERIFICATION CHECKS PASSED SUCCESSFULLY ===");
  } finally {
    if (apiProc) apiProc.kill();
    if (webProc) webProc.kill();
  }
}

runTests().catch((err) => {
  console.error("VERIFICATION FAILED:", err);
  process.exit(1);
});
