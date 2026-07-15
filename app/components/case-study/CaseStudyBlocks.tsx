import Image from 'next/image'
import clsx from 'clsx'
import Heading from '../global/Heading'
import PageSection from '../global/PageSection'
import type { CaseStudyBlock } from '../../types/content'
import CaseStudyMedia from './CaseStudyMedia'
import RichText from './RichText'

function InlineMetrics({
  metrics,
}: {
  metrics: NonNullable<
    Extract<CaseStudyBlock, { type: 'contentMedia' }>['metrics']
  >
}) {
  return (
    <dl className="border-primary bg-primary grid gap-[3px] border-[3px]">
      {metrics.map(metric => (
        <div
          key={`${metric.value}-${metric.label}`}
          className="bg-background flex flex-col gap-1 p-4"
        >
          <dt className="text-primary text-2xl font-bold md:text-3xl">
            {metric.value}
          </dt>
          <dd className="text-base leading-snug md:text-lg">{metric.label}</dd>
        </div>
      ))}
    </dl>
  )
}

function BlockHeading({
  eyebrow,
  heading,
}: {
  eyebrow?: string
  heading?: string
}) {
  if (!eyebrow && !heading) return null

  return (
    <div className="flex flex-col gap-4">
      {eyebrow && (
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">
          {eyebrow}
        </p>
      )}
      {heading && (
        <Heading as="h2" variant="projectSection">
          {heading}
        </Heading>
      )}
    </div>
  )
}

function RichTextBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: 'richText' }>
}) {
  return (
    <PageSection>
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <BlockHeading eyebrow={block.eyebrow} heading={block.heading} />
        <RichText document={block.body} />
      </div>
    </PageSection>
  )
}

function MediaBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: 'media' }>
}) {
  return (
    <PageSection>
      <CaseStudyMedia media={block.media} width={block.width} />
    </PageSection>
  )
}

function ContentMediaBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: 'contentMedia' }>
}) {
  return (
    <PageSection containerClassName="gap-12 md:gap-20">
      <div
        className={
          block.layout === 'stacked'
            ? 'flex max-w-3xl flex-col gap-8'
            : 'grid gap-10 md:grid-cols-2 md:gap-16'
        }
      >
        <BlockHeading eyebrow={block.eyebrow} heading={block.heading} />
        <div className="flex flex-col gap-8">
          <RichText document={block.body} />
          {block.metrics && <InlineMetrics metrics={block.metrics} />}
        </div>
      </div>
      <CaseStudyMedia media={block.media} />
    </PageSection>
  )
}

function MetricsBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: 'metrics' }>
}) {
  return (
    <PageSection spacing="compact" containerClassName="gap-8">
      {block.heading && (
        <Heading as="h2" variant="projectSection">
          {block.heading}
        </Heading>
      )}
      <dl
        className={clsx(
          'border-primary bg-primary grid gap-[3px] border-[3px] sm:grid-cols-2',
          block.metrics.length === 3 && 'md:grid-cols-3',
          block.metrics.length >= 4 && 'md:grid-cols-4'
        )}
      >
        {block.metrics.map(metric => (
          <div
            key={`${metric.value}-${metric.label}`}
            className="bg-background flex min-h-36 flex-col justify-between gap-5 p-5 md:min-h-44 md:p-7"
          >
            <dt className="text-primary text-3xl font-bold md:text-4xl">
              {metric.value}
            </dt>
            <dd className="text-base leading-snug md:text-lg">
              {metric.label}
            </dd>
          </div>
        ))}
      </dl>
    </PageSection>
  )
}

function QuoteBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: 'quote' }>
}) {
  return (
    <PageSection className="bg-primary/10" containerClassName="gap-10">
      {block.logo && (
        <Image
          src={block.logo.src}
          alt={block.logo.alt}
          width={block.logo.width}
          height={block.logo.height}
          className="self-start object-contain"
        />
      )}
      <blockquote className="flex max-w-4xl flex-col gap-8">
        <p className="text-2xl leading-snug font-semibold text-pretty md:text-4xl">
          “{block.quote}”
        </p>
        <footer className="flex flex-col gap-1 text-lg">
          <cite className="font-bold not-italic">{block.attribution}</cite>
          {block.relationship && <span>{block.relationship}</span>}
        </footer>
      </blockquote>
    </PageSection>
  )
}

function CaseStudyBlockView({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case 'richText':
      return <RichTextBlock block={block} />
    case 'media':
      return <MediaBlock block={block} />
    case 'contentMedia':
      return <ContentMediaBlock block={block} />
    case 'metrics':
      return <MetricsBlock block={block} />
    case 'quote':
      return <QuoteBlock block={block} />
    default: {
      const exhaustiveCheck: never = block
      return exhaustiveCheck
    }
  }
}

export default function CaseStudyBlocks({
  blocks,
}: {
  blocks: CaseStudyBlock[]
}) {
  return blocks.map(block => (
    <CaseStudyBlockView key={block.id} block={block} />
  ))
}
