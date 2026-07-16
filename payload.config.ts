import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Users } from './cms/collections/Users'
import { Media } from './cms/collections/Media'
import { Projects } from './cms/collections/Projects'
import { Homepage } from './cms/globals/Homepage'
import { getPayloadEnvironment } from './cms/env'

const env = getPayloadEnvironment()
const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    livePreview: {
      url: ({ data }) => `${env.serverURL}/work/${data.slug}?preview=${env.previewSecret}`,
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Projects],
  globals: [Homepage],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: env.databaseURL,
      max: 3,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
    },
    push: false,
  }),
  graphQL: { disable: true },
  cors: [env.serverURL],
  csrf: [env.serverURL],
  secret: env.payloadSecret,
  serverURL: env.serverURL,
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'cms/payload-types.ts') },
  plugins: [
    vercelBlobStorage({
      enabled: env.useBlob,
      collections: { media: { disablePayloadAccessControl: true } },
      clientUploads: true,
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
