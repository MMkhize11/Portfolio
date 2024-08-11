/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "portfolio-image-store.s3.ap-south-1.amazonaws.com",
      },
      {
        hostname: "ibernipnpncvyxmhwpcy.supabase.co",
      },
      {
        hostname: "wa.me",
      },
      // wa.me
    ],
  },
};

export default nextConfig;
