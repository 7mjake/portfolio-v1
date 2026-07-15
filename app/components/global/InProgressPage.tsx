import Heading from './Heading'
import Link from './Link'
import PageSection from './PageSection'

type InProgressPageProps = {
  title: string
}

export default function InProgressPage({ title }: InProgressPageProps) {
  return (
    <PageSection
      className="flex min-h-[calc(100vh-16rem)] items-center"
      spacing="default"
    >
      <div className="border-primary max-w-2xl space-y-6 border-[3px] p-8 md:p-12">
        <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">
          Page in progress
        </p>
        <Heading as="h1" variant="section">
          {title}
        </Heading>
        <p className="max-w-prose text-lg md:text-xl">
          I&apos;m still putting this page together. In the meantime, take a
          look at my work.
        </p>
        <Link
          href="/"
          variant="button"
          className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5"
        >
          Back to work
        </Link>
      </div>
    </PageSection>
  )
}
