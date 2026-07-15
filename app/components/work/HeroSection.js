import HeroBackground from './HeroBackground'
import Container from '../global/Container'
import Link from '../global/Link'
import Heading from '../global/Heading'
import { ArrowUpRight } from 'feather-icons-react'

export default function HeroSection() {
  return (
    <section className="flex flex-col gap-40">
      <div
        className="pointer-events-none absolute top-0 -z-50 hidden h-[1000px] w-full bg-center dark:block"
        style={{
          backgroundImage: "url('/images/noise-hero-dark.png')",
          backgroundSize: 'var(--noise-size) var(--noise-size)',
        }}
        aria-hidden="true"
      />
      <HeroBackground />
      <Container>
        <section className="flex flex-col gap-5 text-center md:gap-10">
          <h1 className="text-secondary text-2xl font-semibold md:text-3xl">
            Jake Martin
          </h1>

          <Heading as="div" variant="hero" className="mt-2 flex flex-col gap-1 md:mt-5">
            <h2>Designer</h2>
            <h2>Developer</h2>
            <h2>Maker</h2>
          </Heading>

          {/* <div className="font-newake uppercase font-medium text-[10rem] text-primary mt-5 leading-[0.75]">
            <h2 className="">Designer</h2>
            <h2 className="text-center">Developer</h2>
            <h2 className="text-right">Maker</h2>
          </div> */}

          <h3 className="text-secondary text-2xl font-semibold md:text-3xl">
            New York City
          </h3>
        </section>
      </Container>

      <Container>
        <section className="flex flex-col gap-8">
          <p className="text-secondary w-5/6 text-xl leading-normal font-medium md:text-4xl">
            👋🏼 Howdy! I&apos;m glad you&apos;re here. Keep scrolling to see my
            favorite projects, check out what I do for{' '}
            <span className="inline-flex">
              <Link
                href="/fun"
                variant="button"
                className="bg-primary/5 hover:bg-primary/20 text-primary inline-block h-fit cursor-pointer rounded-lg px-2 align-middle transition-colors"
              >
                fun,
              </Link>
            </span>{' '}
            or learn more{' '}
            <span className="inline-flex">
              <Link
                href="/about"
                variant="button"
                className="bg-primary/5 hover:bg-primary/20 text-primary inline-block h-fit cursor-pointer rounded-lg px-2 align-middle transition-colors"
              >
                about me
              </Link>
            </span>{' '}
            here.
          </p>
          <p className="text-secondary w-5/6 gap-1 text-xl font-medium md:text-2xl">
            Currently building next-gen developer tools at{' '}
            <span className="inline-flex">
              <Link
                href="https://www.datadoghq.com/"
                target="_blank"
                rel="noopener noreferrer"
                variant="button"
                className="bg-primary/5 hover:bg-primary/20 text-primary inline-flex h-fit cursor-pointer items-center gap-0 rounded-lg px-2 py-1 align-middle transition-colors"
              >
                Datadog <ArrowUpRight className="size-6" />
              </Link>
            </span>
          </p>
        </section>
      </Container>
    </section>
  )
}
