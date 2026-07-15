import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'media',
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'width', type: 'select', defaultValue: 'wide', options: ['contained', 'wide', 'full'] },
  ],
}
