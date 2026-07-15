import type { RichTextDocument, RichTextSpan } from '../../app/data/caseStudies'

function textNode(span: RichTextSpan) {
  if (typeof span === 'string') return { detail: 0, format: 0, mode: 'normal', style: '', text: span, type: 'text', version: 1 }
  let format = 0
  if (span.bold) format |= 1
  if (span.italic) format |= 2
  const text = { detail: 0, format, mode: 'normal', style: '', text: span.text, type: 'text', version: 1 }
  if (!span.href) return text
  return {
    children: [text], direction: null, fields: { linkType: 'custom', newTab: span.href.startsWith('http'), url: span.href },
    format: '', indent: 0, type: 'link', version: 3,
  }
}

function base(children: unknown[]) {
  return { children, direction: 'ltr', format: '', indent: 0, version: 1 }
}

export function convertRichText(document: RichTextDocument) {
  const children = document.map(node => {
    if (node.type === 'paragraph') return { ...base(node.children.map(textNode)), type: 'paragraph', textFormat: 0, textStyle: '' }
    if (node.type === 'heading') return { ...base(node.children.map(textNode)), type: 'heading', tag: `h${node.level}` }
    return {
      ...base(node.items.map((item, index) => ({
        ...base(item.map(textNode)), type: 'listitem', value: index + 1,
      }))),
      type: 'list', listType: node.style === 'ordered' ? 'number' : 'bullet', start: 1, tag: node.style === 'ordered' ? 'ol' : 'ul',
    }
  })
  return { root: { ...base(children), type: 'root' } }
}
