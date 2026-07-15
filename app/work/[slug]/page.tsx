import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import CaseStudyBlocks from '../../components/case-study/CaseStudyBlocks'
import CaseStudyHero from '../../components/case-study/CaseStudyHero'
import RelatedProjects from '../../components/case-study/RelatedProjects'
import { caseStudies, getCaseStudy } from '../../data/caseStudies'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies
    .filter(caseStudy => caseStudy.published)
    .map(caseStudy => ({ slug: caseStudy.slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudy(slug)

  if (!caseStudy) return {}

  return {
    title: caseStudy.seo.title,
    description: caseStudy.seo.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudy(slug)

  if (!caseStudy) notFound()

  return (
    <article>
      <CaseStudyHero caseStudy={caseStudy} />
      <CaseStudyBlocks blocks={caseStudy.blocks} />
      <RelatedProjects slugs={caseStudy.relatedProjectSlugs} />
    </article>
  )
}
