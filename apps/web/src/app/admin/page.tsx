import React from "react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const metadata = buildMetadata({
  title: "Admin Content Management System (CMS)",
  description:
    "Protected administrator portal for managing enquiries, quote requests, blog posts, portfolio projects, and SEO metadata.",
  path: "/admin",
  noIndex: true,
});

export default function AdminPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Admin CMS", path: "/admin" }]} />
        <AdminDashboardClient />
      </div>
    </div>
  );
}
