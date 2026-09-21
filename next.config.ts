import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
