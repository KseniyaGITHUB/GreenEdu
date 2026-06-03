import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  async redirects() {
    return [
      { source: "/ingredients", destination: "/courses", permanent: true },
      {
        source: "/ingredients/:path*",
        destination: "/courses/:path*",
        permanent: true
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eda.ru"
      }
    ]
  }
};

export default nextConfig;
