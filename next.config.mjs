/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Laravel Local
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },{
  protocol: "http",
  hostname: "127.0.0.1",
  port: "8000",
  pathname: "/storage/**",
},

      // Existing
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
      },
    ],
  },
};

export default nextConfig;