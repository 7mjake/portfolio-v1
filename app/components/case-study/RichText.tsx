import type { RichTextDocument, RichTextSpan } from '../../types/content'

type RichTextProps = {
  document: RichTextDocument
}

function Span({ span }: { span: RichTextSpan }) {
  if (typeof span === 'string') {
    return span
  }

  let content = <>{span.text}</>

  if (span.bold) content = <strong>{content}</strong>
  if (span.italic) content = <em>{content}</em>

  if (span.href) {
    const isExternal = span.href.startsWith('http')

    return (
      <a
        href={span.href}
        className="text-primary underline decoration-2 underline-offset-4"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }

  return content
}

function Spans({ spans }: { spans: RichTextSpan[] }) {
  return spans.map((span, index) => <Span key={index} span={span} />)
}

export default function RichText({ document }: RichTextProps) {
  return (
    <div className="flex flex-col gap-5 text-lg leading-relaxed md:text-xl">
      {document.map((node, index) => {
        if (node.type === 'paragraph') {
          return (
            <p key={index} className="text-pretty">
              <Spans spans={node.children} />
            </p>
          )
        }

        if (node.type === 'heading') {
          const Tag = node.level === 3 ? 'h3' : 'h4'

          return (
            <Tag key={index} className="text-primary text-2xl font-bold">
              <Spans spans={node.children} />
            </Tag>
          )
        }

        const List = node.style === 'ordered' ? 'ol' : 'ul'

        return (
          <List
            key={index}
            className={
              node.style === 'ordered'
                ? 'list-decimal space-y-2 pl-6'
                : 'list-disc space-y-2 pl-6'
            }
          >
            {node.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <Spans spans={item} />
              </li>
            ))}
          </List>
        )
      })}
    </div>
  )
}
