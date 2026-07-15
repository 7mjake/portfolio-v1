import type { CollectionConfig } from 'payload'
import sharp from 'sharp'
import { authenticated } from '../access/authenticated'

const limits: Record<string, number> = {
  image: 8 * 1024 * 1024,
  video: 25 * 1024 * 1024,
  application: 10 * 1024 * 1024,
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: [
      'image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml',
      'video/mp4', 'video/webm', 'application/pdf',
    ],
  },
  hooks: {
    beforeValidate: [async ({ data, req }) => {
      const file = req.file
      if (!file) return data
      file.name = file.name
        .toLowerCase()
        .replace(/[^a-z0-9.]+/g, '-')
        .replace(/-+/g, '-')
      const family = file.mimetype.split('/')[0]
      const max = limits[family]
      if (max && file.size > max) throw new Error(`${family} upload exceeds its size limit`)
      if (family === 'video' && !data?.poster) throw new Error('Video uploads require a poster image')
      if (data?.poster) {
        const posterID = typeof data.poster === 'object' ? data.poster.id : data.poster
        const poster = await req.payload.findByID({ collection: 'media', id: posterID, depth: 0, req })
        if (!poster.mimeType?.startsWith('image/')) throw new Error('Video posters must be images')
      }
      if (family === 'image' && file.mimetype !== 'image/svg+xml') {
        const metadata = await sharp(file.data).metadata()
        if ((metadata.width || 0) > 8000 || (metadata.height || 0) > 8000) {
          throw new Error('Raster images cannot exceed 8000 by 8000 pixels')
        }
      }
      return data
    }],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'textarea' },
    {
      name: 'poster', type: 'relationship', relationTo: 'media',
      filterOptions: { mimeType: { contains: 'image/' } },
    },
    { name: 'sourcePath', type: 'text', unique: true, index: true, admin: { hidden: true } },
    { name: 'sourceChecksum', type: 'text', index: true, admin: { hidden: true } },
  ],
}
