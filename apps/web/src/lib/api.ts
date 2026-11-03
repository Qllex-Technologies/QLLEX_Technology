import {
  FALLBACK_BLOG_POSTS,
  FALLBACK_PORTFOLIO_PROJECTS,
} from "@/data/companyContent";

export const API_BASE_URL =
  typeof window !== "undefined"
    ? "/api/v1"
    : (process.env.INTERNAL_API_URL ||
       (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/v1` : "http://127.0.0.1:3000/api/v1"));

export async function fetchBlogPosts() {
  try {
    const res = await fetch(`${API_BASE_URL}/blog`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return FALLBACK_BLOG_POSTS;
    const json = await res.json();
    if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data as typeof FALLBACK_BLOG_POSTS;
    }
    return FALLBACK_BLOG_POSTS;
  } catch {
    return FALLBACK_BLOG_POSTS;
  }
}

export async function fetchBlogPostBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/blog/${encodeURIComponent(slug)}`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.success && json.data) {
        return json.data as (typeof FALLBACK_BLOG_POSTS)[number];
      }
    }
  } catch {
    // Fallback to static seed if API server is offline during build
  }
  return FALLBACK_BLOG_POSTS.find((p) => p.slug === slug) || null;
}

export async function fetchPortfolioProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/portfolio`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return FALLBACK_PORTFOLIO_PROJECTS;
    const json = await res.json();
    if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data as typeof FALLBACK_PORTFOLIO_PROJECTS;
    }
    return FALLBACK_PORTFOLIO_PROJECTS;
  } catch {
    return FALLBACK_PORTFOLIO_PROJECTS;
  }
}

export async function fetchPortfolioProjectBySlug(slug: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/portfolio/${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 30 },
      }
    );
    if (res.ok) {
      const json = await res.json();
      if (json?.success && json.data) {
        return json.data as (typeof FALLBACK_PORTFOLIO_PROJECTS)[number];
      }
    }
  } catch {
    // Fallback to static seed if API server is offline during build
  }
  return FALLBACK_PORTFOLIO_PROJECTS.find((p) => p.slug === slug) || null;
}

export async function fetchVerifiedTestimonials(): Promise<
  Array<{
    _id: string;
    clientName: string;
    clientRole: string;
    company: string;
    quote: string;
    projectSlug?: string;
    verified: boolean;
  }>
> {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    if (json?.success && Array.isArray(json.data)) {
      return json.data;
    }
    return [];
  } catch {
    return [];
  }
}

export async function fetchServiceSeoOverride(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/services/seo`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json?.success && Array.isArray(json.data)) {
      return (
        json.data.find(
          (item: { slug: string }) => item.slug === slug.toLowerCase()
        ) || null
      );
    }
    return null;
  } catch {
    return null;
  }
}
