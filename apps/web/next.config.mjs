/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@nexovanta/shared"],
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    let apiOrigin = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";
    apiOrigin = apiOrigin.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiOrigin}/api/v1/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
