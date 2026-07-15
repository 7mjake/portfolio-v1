import 'server-only'
import config from '@payload-config'
import { getPayload } from 'payload'
import type { Project } from '@/cms/payload-types'
import { normalizeCaseStudy, normalizeProjectCard } from './normalizeProject'

const publishedWhere = { _status: { equals: 'published' as const } }

export async function getPublishedProjects() {
  const payload = await getPayload({ config })
  const homepage = await payload.findGlobal({
    slug: 'homepage', depth: 2, draft: false, overrideAccess: false,
  })
  const featured = (homepage.featuredProjects || []).filter((item): item is Project => typeof item === 'object' && item._status === 'published')
  if (featured.length) return featured.map(normalizeProjectCard)

  const result = await payload.find({
    collection: 'projects', depth: 1, pagination: false, sort: 'sortOrder',
    draft: false, overrideAccess: false, where: publishedWhere,
  })
  return result.docs.map(normalizeProjectCard)
}

export async function getPublishedCaseStudy(slug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects', depth: 2, limit: 1, draft: false, overrideAccess: false,
    where: { and: [publishedWhere, { slug: { equals: slug } }, { caseStudyEnabled: { equals: true } }] },
  })
  return result.docs[0] ? normalizeCaseStudy(result.docs[0]) : null
}
