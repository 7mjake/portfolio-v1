import type { Media, Project } from '@/cms/payload-types'
import type {
  CaseStudy,
  CaseStudyBlock,
  CaseStudyMedia,
  ImageMedia,
  ProjectCard,
  RichTextDocument,
  RichTextSpan,
} from '@/app/types/content'

function populatedMedia(value: number | Media | null | undefined): Media {
  if (!value || typeof value !== 'object' || !value.url) throw new Error('Expected populated media')
  return value
}

function image(value: number | Media | null | undefined): ImageMedia {
  const media = populatedMedia(value)
  return {
    kind: 'image', src: media.url!, alt: media.alt, width: media.width || 1,
    height: media.height || 1, caption: media.caption || undefined,
  }
}

function media(value: number | Media | null | undefined): CaseStudyMedia {
  const item = populatedMedia(value)
  if (item.mimeType?.startsWith('video/')) {
    const poster = image(item.poster)
    return { kind: 'video', src: item.url!, poster: poster.src, label: item.alt, caption: item.caption || undefined }
  }
  return image(item)
}

function inline(node: Record<string, unknown>): RichTextSpan[] {
  const children = Array.isArray(node.children) ? node.children as Record<string, unknown>[] : []
  return children.flatMap(child => {
    if (child.type === 'link') {
      const fields = (child.fields || {}) as Record<string, unknown>
      const href = typeof fields.url === 'string' ? fields.url : undefined
      return inline(child).map(span => typeof span === 'string' ? { text: span, href } : { ...span, href })
    }
    if (typeof child.text === 'string') {
      if (!child.format) return child.text
      const format = Number(child.format)
      return { text: child.text, bold: Boolean(format & 1), italic: Boolean(format & 2) }
    }
    return inline(child)
  })
}

export function normalizeLexical(value: unknown): RichTextDocument {
  const root = (value as { root?: { children?: Record<string, unknown>[] } } | null)?.root
  const nodes = root?.children || []
  const document: RichTextDocument = []
  for (const node of nodes) {
    if (node.type === 'paragraph') document.push({ type: 'paragraph', children: inline(node) })
    if (node.type === 'heading') {
      const tag = node.tag === 'h4' ? 4 : 3
      document.push({ type: 'heading', level: tag, children: inline(node) })
    }
    if (node.type === 'list') {
      const children = Array.isArray(node.children) ? node.children as Record<string, unknown>[] : []
      document.push({ type: 'list', style: node.listType === 'number' ? 'ordered' : 'unordered', items: children.map(inline) })
    }
  }
  return document
}

export function normalizeProjectCard(project: Project): ProjectCard {
  const cardImage = populatedMedia(project.cardImage)
  const href = project.caseStudyEnabled ? `/work/${project.slug}` : project.externalURL || undefined
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    description: project.shortDescription,
    image: cardImage.url!,
    imageAlt: cardImage.alt,
    tags: project.tags?.map(item => item.tag) || [],
    access: project.accessStatus,
    href,
    external: Boolean(project.externalURL && !project.caseStudyEnabled),
  }
}

function normalizeBlock(block: NonNullable<Project['blocks']>[number]): CaseStudyBlock {
  const id = block.id || `${block.blockType}-${Math.random()}`
  switch (block.blockType) {
    case 'richText': return { type: 'richText', id, eyebrow: block.eyebrow || undefined, heading: block.heading || undefined, body: normalizeLexical(block.body) }
    case 'media': return { type: 'media', id, media: media(block.media), width: block.width || undefined }
    case 'contentMedia': return {
      type: 'contentMedia', id, eyebrow: block.eyebrow || undefined, heading: block.heading,
      body: normalizeLexical(block.body), media: media(block.media),
      metrics: block.metrics?.map(item => ({ value: item.value, label: item.label })) || undefined,
      layout: block.layout || undefined,
    }
    case 'metrics': return { type: 'metrics', id, heading: block.heading || undefined, metrics: block.metrics.map(item => ({ value: item.value, label: item.label })) }
    case 'quote': return {
      type: 'quote', id, quote: block.quote, attribution: block.attribution,
      relationship: block.relationship || undefined, logo: block.logo ? image(block.logo) : undefined,
    }
  }
}

export function normalizeCaseStudy(project: Project): CaseStudy {
  if (!project.caseStudyEnabled || !project.summary || !project.heroMedia) throw new Error('Project has no complete case study')
  const details = [
    ['My role', project.role], ['The team', project.team], ['Timeframe', project.timeline],
    ['Project phase', project.projectPhase], ['Platform', project.platform], ['Project type', project.projectType],
    ['Client', project.clientOrganization],
  ].filter((item): item is [string, string] => Boolean(item[1])).map(([label, value]) => ({ label, value }))

  return {
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    seo: {
      title: project.metaTitle || project.title,
      description: project.metaDescription || project.shortDescription,
      image: project.socialImage ? populatedMedia(project.socialImage).url || undefined : undefined,
    },
    details,
    heroMedia: media(project.heroMedia),
    blocks: (project.blocks || []).map(normalizeBlock),
    relatedProjects: (project.relatedProjects || []).filter((item): item is Project => typeof item === 'object').map(normalizeProjectCard),
  }
}
