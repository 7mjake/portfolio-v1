import Heading from '../global/Heading'
import PageSection from '../global/PageSection'
import type { CaseStudy } from '../../data/caseStudies'
import CaseStudyMedia from './CaseStudyMedia'

type CaseStudyHeroProps = {
  caseStudy: CaseStudy
}

export default function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  return (
    <>
      <PageSection spacing="compact" containerClassName="gap-12 md:gap-20">
        <header className="flex max-w-4xl flex-col gap-4">
          <Heading as="h1" variant="projectHero">
            {caseStudy.title}
          </Heading>
          <p className="text-2xl text-pretty md:text-4xl">
            {caseStudy.summary}
          </p>
        </header>

        <dl className="border-primary bg-primary grid gap-[3px] border-[3px] sm:grid-cols-2 md:grid-cols-3">
          {caseStudy.details.map(detail => (
            <div
              key={detail.label}
              className="bg-background flex min-h-32 flex-col justify-between gap-4 p-5 md:min-h-40 md:p-7"
            >
              <dt className="text-primary text-sm font-semibold uppercase">
                {detail.label}
              </dt>
              <dd className="text-2xl font-semibold md:text-3xl">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <PageSection containerClassName="md:-my-12">
        <CaseStudyMedia media={caseStudy.heroMedia} priority />
      </PageSection>
    </>
  )
}
