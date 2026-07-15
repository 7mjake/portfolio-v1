import type { Block, Field } from 'payload'

export const metricsFields: Field[] = [
  { name: 'value', type: 'text', required: true },
  { name: 'label', type: 'text', required: true },
]

export const ContentMediaBlock: Block = {
  slug: 'contentMedia',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'richText', required: true },
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'metrics', type: 'array', fields: metricsFields },
    { name: 'layout', type: 'select', defaultValue: 'split', options: ['stacked', 'split'] },
  ],
}
