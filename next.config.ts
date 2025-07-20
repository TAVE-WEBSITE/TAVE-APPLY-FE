import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

export default withSentryConfig(nextConfig, {
    org: 'tave-website',
    project: 'javascript-nextjs',
    silent: !process.env.CI,
    widenClientFileUpload: true,
    disableLogger: true,
    automaticVercelMonitors: true,
});
