import Container from './Container'
import JmLogo2 from './svgs/jm-logo-2'
import { ArrowUpRight } from 'feather-icons-react'
import Link from './Link'

export default function Footer() {
  return (
    <Container>
      <footer className="mb-24 flex flex-col items-start justify-between gap-8 text-lg md:flex-row md:gap-12">
        <div className="flex flex-1 flex-col items-start gap-3 md:gap-5">
          <JmLogo2 className="text-primary h-8 py-1" />
          <p className="text-pretty">Loveingly crafted with React</p>
          <p>© 2025 Jake Martin</p>
        </div>
        <div className="flex flex-1 flex-col gap-3 md:gap-5">
          <h3 className="text-primary font-newake text-2xl tracking-wide uppercase">
            Contact
          </h3>
          <Link
            href="https://www.linkedin.com/in/jakemartin-design//"
            className="flex items-center gap-2"
          >
            LinkedIn <ArrowUpRight className="size-4" />
          </Link>
          <Link
            href="https://github.com/7mjake"
            className="flex items-center gap-2"
          >
            GitHub <ArrowUpRight className="size-4" />
          </Link>
          <Link href="mailto:jake@jake.com" className="flex items-center gap-2">
            me@jakemartin.design
          </Link>
        </div>
        <div className="flex flex-1 flex-col gap-3 md:gap-5">
          <h3 className="text-primary font-newake text-2xl tracking-wide uppercase">
            Navigation
          </h3>
          <Link href="/">Work</Link>
          <Link href="/fun">Fun</Link>
          <Link href="/about">About</Link>
          <Link href="/resume">Resume</Link>
        </div>
      </footer>
    </Container>
  )
}
