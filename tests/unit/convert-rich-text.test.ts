import { describe, expect, it } from 'vitest'
import { convertRichText } from '../../scripts/import/convertRichText'

describe('convertRichText', () => {
  it('converts headings, formatting, links, and ordered and unordered lists deterministically', () => {
    const source = [
      { type: 'heading' as const, level: 3 as const, children: [{ text: 'Heading', bold: true }] },
      { type: 'paragraph' as const, children: ['Plain ', { text: 'link', italic: true, href: 'https://example.com' }] },
      { type: 'list' as const, style: 'ordered' as const, items: [['One']] },
      { type: 'list' as const, style: 'unordered' as const, items: [['Two']] },
    ]
    const first = convertRichText(source)
    expect(first).toEqual(convertRichText(source))
    expect(first.root.children.map(node => (node as { type: string }).type)).toEqual(['heading', 'paragraph', 'list', 'list'])
    expect(first.root.children[2]).toMatchObject({ listType: 'number', tag: 'ol' })
    expect(JSON.stringify(first)).toContain('https://example.com')
  })
})
