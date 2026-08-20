import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "developer.apple.com",
        pathname: "/assets/elements/badges/**",
      },
      {
        protocol: "https",
        hostname: "play.google.com",
        pathname: "/intl/en_us/badges/static/images/badges/**",
      },
    ],
  },
};

export default nextConfig;
