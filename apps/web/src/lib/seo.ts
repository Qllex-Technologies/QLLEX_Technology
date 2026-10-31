import type { Metadata } from "next";
import { BRAND_CONFIG } from "@nexovanta/shared";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
  type = "website",
  publishedTime,
}: PageSeoOptions): Metadata {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;
  const fullTitle = title.includes(BRAND_CONFIG.name)
    ? title
    : `${title} | ${BRAND_CONFIG.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: BRAND_CONFIG.name,
      locale: "en_US",
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_CONFIG.name,
    url: SITE_URL,
    logo: `${SITE_URL}/qllex-logo.jpg`,
    slogan: BRAND_CONFIG.tagline,
    description: BRAND_CONFIG.description,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: BRAND_CONFIG.contact.email,
        contactType: "customer service",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_CONFIG.name,
    url: SITE_URL,
    description: BRAND_CONFIG.description,
    publisher: {
      "@type": "Organization",
      name: BRAND_CONFIG.name,
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function buildServiceJsonLd(service: {
  title: string;
  description: string;
  slug: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.category,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: BRAND_CONFIG.name,
      url: SITE_URL,
    },
  };
}

export function buildArticleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
    author: {
      "@type": "Person",
      name: article.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    },
  };
}
