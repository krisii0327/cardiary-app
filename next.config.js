/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'krisii0327-cardiary-app.s3.eu-central-1.amazonaws.com',
          },
        ],
    },
}

module.exports = nextConfig
