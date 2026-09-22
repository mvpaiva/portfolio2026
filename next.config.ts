import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Default max is 3840 — too small for the Prototipação & Testes
    // (Figma) lightbox's dedicated zoom exports (7509px wide, Matheus
    // 2026-09-22). Without a larger deviceSize, Next caps the served
    // image at 3840 and the browser upscales it to fill the lightbox,
    // which defeats the point of a high-res export made specifically
    // for zooming in.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 5120, 7680],
  },
  async redirects() {
    return [
      {
        source: "/case/square-self-checkout",
        destination: "/square",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
