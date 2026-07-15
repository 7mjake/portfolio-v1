import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: ({ req }) => Boolean(req.user) || (req.query?.draft !== 'true' && req.query?.draft !== true),
    update: authenticated,
    readVersions: authenticated,
  },
  versions: { drafts: { autosave: true } },
  fields: [
    {
      name: 'featuredProjects', type: 'relationship', relationTo: 'projects',
      hasMany: true, required: true, minRows: 1,
      filterOptions: { _status: { equals: 'published' } },
    },
  ],
}
