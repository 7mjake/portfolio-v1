import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { RichTextBlock } from '../blocks/RichText'
import { MediaBlock } from '../blocks/Media'
import { ContentMediaBlock } from '../blocks/ContentMedia'
import { MetricsBlock } from '../blocks/Metrics'
import { QuoteBlock } from '../blocks/Quote'

const caseStudyCondition = (_data: unknown, siblingData: { caseStudyEnabled?: boolean }) => Boolean(siblingData.caseStudyEnabled)

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'sortOrder', '_status'] },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
    readVersions: authenticated,
  },
  versions: { drafts: { autosave: true }, maxPerDoc: 50 },
  hooks: {
    beforeValidate: [async ({ data, originalDoc, req }) => {
      if (!data) return data
      if (data.caseStudyEnabled && data.externalURL) throw new Error('A project cannot have both a case study and an external URL')
      if (data.caseStudyEnabled && (!data.summary || !data.heroMedia || !data.metaTitle || !data.metaDescription || !data.blocks?.length)) {
        throw new Error('Enabled case studies require summary, hero media, SEO fields, and content blocks')
      }
      const currentID = originalDoc?.id
      if (currentID && data.relatedProjects?.some((related: number | { id: number }) => (typeof related === 'object' ? related.id : related) === currentID)) {
        throw new Error('A project cannot relate to itself')
      }
      const cardImageID = typeof data.cardImage === 'object' ? data.cardImage.id : data.cardImage
      if (cardImageID) {
        const cardImage = await req.payload.findByID({ collection: 'media', id: cardImageID, depth: 0, req })
        if (!cardImage.mimeType?.startsWith('image/')) throw new Error('Project card media must be an image')
        if (cardImage.mimeType !== 'image/svg+xml' && cardImage.width !== cardImage.height) {
          throw new Error('Project card images must be square')
        }
      }
      return data
    }],
  },
  fields: [
    {
      type: 'tabs', tabs: [
        { label: 'Project Card', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'slug', type: 'text', required: true, unique: true, index: true },
          { name: 'shortDescription', type: 'textarea', required: true },
          { name: 'tags', type: 'array', required: true, fields: [{ name: 'tag', type: 'text', required: true }] },
          { name: 'accessStatus', type: 'select', defaultValue: 'none', required: true, options: ['none', 'private', 'in-progress'] },
          { name: 'externalURL', type: 'text', validate: (value: string | null | undefined) => {
            if (!value) return true
            try { new URL(value); return true } catch { return 'Enter a valid absolute URL' }
          } },
        ] },
        { label: 'Case Study', fields: [
          { name: 'summary', type: 'textarea', admin: { condition: caseStudyCondition } },
          { name: 'role', type: 'text', admin: { condition: caseStudyCondition } },
          { name: 'team', type: 'text', admin: { condition: caseStudyCondition } },
          { name: 'timeline', type: 'text', admin: { condition: caseStudyCondition } },
          { name: 'projectPhase', type: 'text', admin: { condition: caseStudyCondition } },
          { name: 'platform', type: 'text', admin: { condition: caseStudyCondition } },
          { name: 'projectType', type: 'text', admin: { condition: caseStudyCondition } },
          { name: 'clientOrganization', type: 'text', admin: { condition: caseStudyCondition } },
          { name: 'blocks', type: 'blocks', blocks: [RichTextBlock, MediaBlock, ContentMediaBlock, MetricsBlock, QuoteBlock], admin: { condition: caseStudyCondition } },
          {
            name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true,
            filterOptions: ({ id }) => id ? { id: { not_equals: id } } : true,
            admin: { condition: caseStudyCondition },
          },
        ] },
        { label: 'Media', fields: [
          { name: 'cardImage', type: 'upload', relationTo: 'media', required: true },
          { name: 'heroMedia', type: 'upload', relationTo: 'media', admin: { condition: caseStudyCondition } },
        ] },
        { label: 'SEO', fields: [
          { name: 'metaTitle', type: 'text' },
          { name: 'metaDescription', type: 'textarea' },
          { name: 'socialImage', type: 'upload', relationTo: 'media' },
        ] },
        { label: 'Publishing', fields: [
          { name: 'caseStudyEnabled', type: 'checkbox', defaultValue: false },
          { name: 'sortOrder', type: 'number', required: true, min: 0, index: true },
        ] },
      ],
    },
  ],
}
