import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CaseStudyBlocks from '../../../components/case-study/CaseStudyBlocks'
import CaseStudyHero from '../../../components/case-study/CaseStudyHero'
import RelatedProjects from '../../../components/case-study/RelatedProjects'
import { getPreviewCaseStudy } from '../../../lib/content/preview'
import { getPublishedCaseStudy } from '../../../lib/content/public'

export const dynamic = 'force-dynamic'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}

async function load({ params, searchParams }: ProjectPageProps) {
  const [{ slug }, { preview }] = await Promise.all([params, searchParams])
  return preview ? getPreviewCaseStudy(slug, preview) : getPublishedCaseStudy(slug)
}

export async function generateMetadata(props: ProjectPageProps): Promise<Metadata> {
  const caseStudy = await load(props)
  if (!caseStudy) return {}
  return {
    title: caseStudy.seo.title,
    description: caseStudy.seo.description,
    openGraph: caseStudy.seo.image ? { images: [caseStudy.seo.image] } : undefined,
  }
}

export default async function ProjectPage(props: ProjectPageProps) {
  const caseStudy = await load(props)
  if (!caseStudy) notFound()
  return (
    <article>
      <CaseStudyHero caseStudy={caseStudy} />
      <CaseStudyBlocks blocks={caseStudy.blocks} />
      <RelatedProjects projects={caseStudy.relatedProjects} />
    </article>
  )
}
