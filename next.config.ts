import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    // Sanity's image CDN, ready for when content moves off local assets.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default config;
