import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'img.clerk.com' }],
  },
};

export default withSentryConfig(nextConfig, {
  org: "university-of-massachusetts-bo",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: { 
    enabled: true, 
  },
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});