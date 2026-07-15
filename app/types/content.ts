export type ProjectAccess = 'none' | 'private' | 'in-progress'

export type ProjectCard = {
  id: string | number
  slug: string
  title: string
  description: string
  image: string
  imageAlt: string
  tags: string[]
  access: ProjectAccess
  href?: string
  external: boolean
}

export type RichTextSpan = string | { text: string; bold?: boolean; italic?: boolean; href?: string }
export type RichTextNode =
  | { type: 'paragraph'; children: RichTextSpan[] }
  | { type: 'heading'; level: 3 | 4; children: RichTextSpan[] }
  | { type: 'list'; style: 'ordered' | 'unordered'; items: RichTextSpan[][] }
export type RichTextDocument = RichTextNode[]

export type ImageMedia = {
  kind: 'image'; src: string; alt: string; width: number; height: number; caption?: string
}
export type VideoMedia = {
  kind: 'video'; src: string; poster: string; label: string; caption?: string
}
export type CaseStudyMedia = ImageMedia | VideoMedia
export type CaseStudyMetric = { value: string; label: string }
export type CaseStudyBlock =
  | { type: 'richText'; id: string; eyebrow?: string; heading?: string; body: RichTextDocument }
  | { type: 'media'; id: string; media: CaseStudyMedia; width?: 'contained' | 'wide' | 'full' }
  | { type: 'contentMedia'; id: string; eyebrow?: string; heading: string; body: RichTextDocument; media: CaseStudyMedia; metrics?: CaseStudyMetric[]; layout?: 'stacked' | 'split' }
  | { type: 'metrics'; id: string; heading?: string; metrics: CaseStudyMetric[] }
  | { type: 'quote'; id: string; quote: string; attribution: string; relationship?: string; logo?: ImageMedia }

export type CaseStudy = {
  slug: string
  title: string
  summary: string
  seo: { title: string; description: string; image?: string }
  details: Array<{ label: string; value: string }>
  heroMedia: CaseStudyMedia
  blocks: CaseStudyBlock[]
  relatedProjects: ProjectCard[]
}
