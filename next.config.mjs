import { withPayload } from '@payloadcms/next/withPayload'

const localDevices = ['192.168.68.62', '192.168.68.66']

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', ...localDevices],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: (process.env.BLOB_PUBLIC_HOSTNAME || 'example.com').toLowerCase() },
    ],
  },
}

export default withPayload(nextConfig)
