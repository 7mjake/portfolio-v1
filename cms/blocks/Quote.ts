import type { Block } from 'payload'

export const QuoteBlock: Block = {
  slug: 'quote',
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'attribution', type: 'text', required: true },
    { name: 'relationship', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
  ],
}
