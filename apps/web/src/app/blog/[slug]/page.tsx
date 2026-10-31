import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import { buildMetadata, buildArticleJsonLd } from "@/lib/seo";
import { fetchBlogPostBySlug, fetchBlogPosts } from "@/lib/api";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";

interface BlogArticlePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) {
    return buildMetadata({
      title: "Article Not Found",
      description: "The requested blog article could not be found.",
      path: `/blog/${params.slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

function renderFormattedArticleContent(markdown: string) {
  const blocks = markdown.split(/\n\n+/);
  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="mt-10 mb-4 font-display text-2xl sm:text-3xl font-bold text-slateText-primary"
        >
          {trimmed.replace(/^##\s+/, "")}
        </h2>
      );
    }
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="mt-8 mb-3 font-display text-xl font-bold text-slateText-primary"
        >
          {trimmed.replace(/^###\s+/, "")}
        </h3>
      );
    }
    if (trimmed.startsWith("- ")) {
      const items = trimmed
        .split("\n")
        .map((line) => line.replace(/^-\s+/, "").trim());
      return (
        <ul
          key={index}
          className="my-4 space-y-2.5 pl-5 list-disc text-slateText-secondary text-base leading-relaxed"
        >
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }
    return (
      <p
        key={index}
        className="my-4 text-base text-slateText-secondary leading-relaxed"
      >
        {trimmed}
      </p>
    );
  });
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "October 2026";

  const articleJsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.seoDescription || post.excerpt,
    slug: post.slug,
    publishedAt: post.publishedAt || "2026-10-01T00:00:00.000Z",
    authorName: post.authorName,
  });

  return (
    <div className="py-12 sm:py-16">
      <JsonLd data={articleJsonLd} />

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />

        <header className="rounded-3xl border border-white/10 bg-obsidian-800 p-7 sm:p-10 space-y-5">
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-slateText-secondary">
            <span className="rounded border border-accent/40 bg-accent/10 px-2.5 py-1 text-accent">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-accent" />
              <time dateTime={post.publishedAt}>{formattedDate}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-accent" />
              <span>{post.readTimeMinutes} min read</span>
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slateText-primary leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slateText-secondary leading-relaxed">
            {post.excerpt}
          </p>

          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-obsidian-900 text-accent">
              <User className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slateText-primary">
                {post.authorName}
              </div>
              <div className="text-xs text-slateText-muted">
                {post.authorRole}
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-obsidian-800/40 p-6 sm:p-10">
          {renderFormattedArticleContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-slateText-muted mr-2">
              Topics:
            </span>
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-lg border border-white/10 bg-obsidian-800 px-3 py-1 font-mono text-xs text-slateText-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-12 rounded-2xl border border-white/15 bg-obsidian-800 p-7 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-xl font-bold text-slateText-primary">
              Planning a System Around These Architecture Patterns?
            </h2>
            <p className="mt-1 text-sm text-slateText-secondary">
              Discuss your project requirements directly with our engineering
              team.
            </p>
          </div>
          <Link
            href="/get-a-quote"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-hover shrink-0"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slateText-secondary hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Engineering Articles</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
