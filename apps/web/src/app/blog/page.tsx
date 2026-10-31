import React from "react";
import Link from "next/link";
import { BookOpen, Clock, User } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { fetchBlogPosts } from "@/lib/api";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata = buildMetadata({
  title: "Engineering Blog & Technical Insights | Architecture, AI & Web Performance",
  description:
    "Read technical articles and engineering guides from QLLEX Technologies covering Next.js App Router, MERN stack architecture, Python RAG pipelines, and GSAP/WebGL performance.",
  path: "/blog",
});

export default async function BlogListingPage() {
  const posts = await fetchBlogPosts();

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />

        <div className="max-w-3xl space-y-4 pb-12 border-b border-white/10">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Engineering Insights &amp; Architecture Notes
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slateText-primary">
            Practical Software Engineering Articles
          </h1>
          <p className="text-base sm:text-lg text-slateText-secondary leading-relaxed">
            In-depth guides written by our architecture, AI, and frontend motion
            teams on building resilient digital products.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="surface-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-xs text-slateText-muted mb-3">
                  <span className="text-accent">{post.category}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readTimeMinutes} min read</span>
                  </span>
                </div>

                <h2 className="font-display text-xl font-bold text-slateText-primary">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 text-sm text-slateText-secondary leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {(post.tags || []).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded border border-white/10 bg-obsidian-900 px-2 py-0.5 font-mono text-[11px] text-slateText-secondary"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 text-slateText-muted">
                  <User className="h-3.5 w-3.5 text-accent" />
                  <span>{post.authorName}</span>
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-slateText-primary hover:text-accent"
                >
                  <BookOpen className="h-3.5 w-3.5 text-accent" />
                  <span>Read Article</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
