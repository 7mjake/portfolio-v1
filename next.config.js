/** @type {import('next').NextConfig} */

const JakesiPhone = '192.168.68.66'
const JakesMacBookPro = '192.168.68.62'

const nextConfig = {
  // experimental.appDir is no longer needed in Next.js 15
  // The App Router is now stable and enabled by default
  allowedDevOrigins: [
    'local-origin.dev',
    '*.local-origin.dev',
    JakesMacBookPro,
    JakesiPhone,
  ],
}

module.exports = nextConfig
