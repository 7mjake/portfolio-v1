import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '@payload-config'
import { caseStudies, projects } from './import/sourceContent'
import { convertRichText } from './import/convertRichText'

type Counts = { created: number; updated: number; skipped: number; failed: number }
const report: { environment?: string; dryRun: boolean; media: Counts; projects: Counts; failures: string[] } = {
  dryRun: process.argv.includes('--dry-run'),
  media: { created: 0, updated: 0, skipped: 0, failed: 0 },
  projects: { created: 0, updated: 0, skipped: 0, failed: 0 },
  failures: [],
}

const environment = process.argv.find(arg => arg.startsWith('--environment='))?.split('=')[1]
if (!environment || !['staging', 'production'].includes(environment)) throw new Error('Use --environment=staging or --environment=production')
if (process.env.APP_ENV !== environment) throw new Error('APP_ENV must match --environment')
if (environment === 'production' && !process.argv.includes('--confirm-production')) throw new Error('Production import requires --confirm-production')
report.environment = environment

const payload = report.dryRun ? null : await getPayload({ config })
const root = process.cwd()
const mediaIDs = new Map<string, number>()
const usesVercelBlob = process.env.USE_VERCEL_BLOB === 'true' || Boolean(process.env.VERCEL)
const blobPublicHost = process.env.BLOB_PUBLIC_HOSTNAME

const mediaSources = new Map<string, { alt: string; poster?: string }>()
for (const project of projects) mediaSources.set(project.image, { alt: `${project.title} project cover` })
for (const study of caseStudies) {
  mediaSources.set(study.heroMedia.src, { alt: study.heroMedia.alt })
  for (const block of study.blocks) {
    if ('media' in block) {
      mediaSources.set(block.media.src, { alt: block.media.kind === 'image' ? block.media.alt : block.media.label, poster: block.media.kind === 'video' ? block.media.poster : undefined })
      if (block.media.kind === 'video') mediaSources.set(block.media.poster, { alt: `${block.media.label} poster` })
    }
    if (block.type === 'quote' && block.logo) mediaSources.set(block.logo.src, { alt: block.logo.alt })
  }
}

async function upsertMedia(sourcePath: string, meta: { alt: string; poster?: string }) {
  const localPath = path.join(root, 'public', sourcePath.replace(/^\//, ''))
  const data = await readFile(localPath)
  const checksum = createHash('sha256').update(data).digest('hex')
  if (report.dryRun) { report.media.created++; return }
  const existing = await payload!.find({ collection: 'media', where: { sourcePath: { equals: sourcePath } }, limit: 2, overrideAccess: true })
  if (existing.totalDocs > 1) throw new Error(`Ambiguous media sourcePath: ${sourcePath}`)
  const existingMedia = existing.docs[0]
  const storedInActiveBlob = !usesVercelBlob || Boolean(
    blobPublicHost && existingMedia?.url?.startsWith(`https://${blobPublicHost}/`)
  )
  if (existingMedia?.sourceChecksum === checksum && storedInActiveBlob) {
    mediaIDs.set(sourcePath, existingMedia.id)
    report.media.skipped++
    return
  }
  const poster = meta.poster ? mediaIDs.get(meta.poster) : undefined
  const file = { data, mimetype: mime(localPath), name: path.basename(localPath), size: data.length }
  const input = { alt: meta.alt, poster, sourcePath, sourceChecksum: checksum }
  const record = existingMedia
    ? await payload!.update({ collection: 'media', id: existingMedia.id, data: input, file, overrideAccess: true })
    : await payload!.create({ collection: 'media', data: input, file, overrideAccess: true })
  mediaIDs.set(sourcePath, record.id)
  report.media[existingMedia ? 'updated' : 'created']++
}

function mime(filename: string) {
  const ext = path.extname(filename).toLowerCase()
  return ({ '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.webm': 'video/webm', '.pdf': 'application/pdf' } as Record<string, string>)[ext] || 'application/octet-stream'
}

for (const [source, meta] of [...mediaSources].sort(([, a]) => a.poster ? 1 : -1)) {
  try { await upsertMedia(source, meta) } catch (error) {
    report.media.failed++
    report.failures.push(`Media ${source}: ${String(error)}. Check the active Blob store for an orphaned upload.`)
  }
}

const projectIDs = new Map<string, number>()
for (const [index, project] of projects.entries()) {
  try {
    const study = caseStudies.find(item => item.slug === project.slug)
    const blocks = study?.blocks.map(block => {
      if (block.type === 'richText') return { blockType: 'richText', eyebrow: block.eyebrow, heading: block.heading, body: convertRichText(block.body) }
      if (block.type === 'media') return { blockType: 'media', media: mediaIDs.get(block.media.src), width: block.width }
      if (block.type === 'metrics') return { blockType: 'metrics', heading: block.heading, metrics: block.metrics }
      if (block.type === 'quote') return { blockType: 'quote', quote: block.quote, attribution: block.attribution, relationship: block.relationship, logo: block.logo ? mediaIDs.get(block.logo.src) : undefined }
      return { blockType: 'contentMedia', eyebrow: block.eyebrow, heading: block.heading, body: convertRichText(block.body), media: mediaIDs.get(block.media.src), metrics: block.metrics, layout: block.layout }
    })
    const details = Object.fromEntries((study?.details || []).map(item => [item.label, item.value]))
    const input = {
      title: project.title, slug: project.slug, shortDescription: project.description,
      tags: project.tags.map(tag => ({ tag })), accessStatus: project.access, cardImage: mediaIDs.get(project.image),
      caseStudyEnabled: Boolean(study), sortOrder: (index + 1) * 10, summary: study?.summary,
      role: details['My role'], team: details['The team'], timeline: details.Timeframe,
      projectPhase: details['Project phase'], platform: details.Platform, projectType: details['Project type'],
      heroMedia: study ? mediaIDs.get(study.heroMedia.src) : undefined, blocks,
      metaTitle: study?.seo.title, metaDescription: study?.seo.description,
      _status: 'published' as const,
    }
    if (report.dryRun) { report.projects.created++; continue }
    const existing = await payload!.find({ collection: 'projects', where: { slug: { equals: project.slug } }, limit: 2, overrideAccess: true })
    if (existing.totalDocs > 1) throw new Error(`Ambiguous project slug: ${project.slug}`)
    const record = existing.docs[0]
      ? await payload!.update({ collection: 'projects', id: existing.docs[0].id, data: input as never, draft: false, overrideAccess: true })
      : await payload!.create({ collection: 'projects', data: input as never, draft: false, overrideAccess: true })
    projectIDs.set(project.slug, (record as unknown as { id: number }).id)
    report.projects[existing.docs[0] ? 'updated' : 'created']++
  } catch (error) { report.projects.failed++; report.failures.push(String(error)) }
}

if (!report.dryRun && report.failures.length === 0) {
  for (const study of caseStudies) {
    await payload!.update({ collection: 'projects', id: projectIDs.get(study.slug)!, data: { relatedProjects: study.relatedProjectSlugs.map(slug => projectIDs.get(slug)!) }, overrideAccess: true })
  }
  await payload!.updateGlobal({ slug: 'homepage', data: { featuredProjects: projects.map(project => projectIDs.get(project.slug)!) }, draft: false, overrideAccess: true })
}

console.log(JSON.stringify(report, null, 2))
if (report.failures.length) process.exitCode = 1
