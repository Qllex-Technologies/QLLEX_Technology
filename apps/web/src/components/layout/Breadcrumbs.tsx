import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const fullTrail: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];
  const jsonLd = buildBreadcrumbJsonLd(fullTrail);

  return (
    <div className="mb-8">
      <JsonLd data={jsonLd} />
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-mono text-ink-muted"
      >
        {fullTrail.map((item, index) => {
          const isLast = index === fullTrail.length - 1;
          return (
            <React.Fragment key={item.path}>
              {index > 0 && (
                <ChevronRight
                  className="h-3.5 w-3.5 text-gray-400 shrink-0"
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-ink-primary font-semibold truncate max-w-[240px] sm:max-w-none"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="inline-flex items-center gap-1 text-ink-secondary hover:text-accent transition-colors"
                >
                  {index === 0 && (
                    <Home className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  <span>{item.name}</span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}
