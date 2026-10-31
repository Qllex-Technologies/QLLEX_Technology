import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");

  const essentialRoutes = [
    "",
    "/services",
    "/technologies",
    "/portfolio",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  return essentialRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/services" ? 0.9 : 0.8,
  }));
}
