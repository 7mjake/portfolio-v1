import Heading from './Heading'
import Link from './Link'
import PageSection from './PageSection'

type InProgressPageProps = {
  title: string
}

export default function InProgressPage({ title }: InProgressPageProps) {
  return (
    <PageSection className="flex min-h-[calc(100vh-16rem)] items-center" spacing="default">
      <div className="outline-primary max-w-2xl space-y-6 p-8 outline-3 outline-solid md:p-12">
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
          className="bg-primary/10 text-primary px-3 py-1.5 hover:bg-primary/20"
        >
          Back to work
        </Link>
      </div>
    </PageSection>
  )
}
