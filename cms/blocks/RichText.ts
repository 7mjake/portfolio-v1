import type { Block } from 'payload'

export const RichTextBlock: Block = {
  slug: 'richText',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'body', type: 'richText', required: true },
  ],
}
