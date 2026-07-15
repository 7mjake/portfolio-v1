import 'server-only'
import { timingSafeEqual } from 'node:crypto'
import { headers } from 'next/headers'
import config from '@payload-config'
import { getPayload } from 'payload'
import { getPayloadEnvironment } from '@/cms/env'
import { normalizeCaseStudy } from './normalizeProject'

function validSecret(received: string | undefined, expected: string) {
  if (!received) return false
  const left = Buffer.from(received)
  const right = Buffer.from(expected)
  return left.length === right.length && timingSafeEqual(left, right)
}

export async function getPreviewCaseStudy(slug: string, secret?: string) {
  const expected = getPayloadEnvironment().previewSecret
  if (!validSecret(secret, expected)) return null
  const payload = await getPayload({ config })
  const auth = await payload.auth({ headers: await headers() })
  if (!auth.user) return null
  const result = await payload.find({
    collection: 'projects', depth: 2, limit: 1, draft: true,
    overrideAccess: false, user: auth.user,
    where: { and: [{ slug: { equals: slug } }, { caseStudyEnabled: { equals: true } }] },
  })
  return result.docs[0] ? normalizeCaseStudy(result.docs[0]) : null
}
