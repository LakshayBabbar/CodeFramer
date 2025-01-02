/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent",
        pathname: "/u/*",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        pathname: "/*",
      },
    ],
  },
};

export default nextConfig;
