import type { Block } from 'payload'
import { metricsFields } from './ContentMedia'

export const MetricsBlock: Block = {
  slug: 'metrics',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'metrics', type: 'array', required: true, minRows: 1, fields: metricsFields },
  ],
}
