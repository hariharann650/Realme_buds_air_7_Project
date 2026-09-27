/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 Forces Next.js to generate static HTML files
  basePath: '/Realme_buds_air_7_Project', // 👈 REQUIRED: Matches your repository name so assets load
  images: {
    unoptimized: true, // 👈 Required because GitHub Pages doesn't support Next.js image optimization server side
  },
};

module.exports = nextConfig;
