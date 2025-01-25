import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'; object-src 'none';",
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
