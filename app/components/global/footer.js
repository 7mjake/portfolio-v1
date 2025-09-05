import Container from './Container'
import JmLogo2 from './svgs/jm-logo-2'
import { ArrowUpRight } from 'feather-icons-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <Container>
      <footer className="mb-24 flex flex-col items-start justify-between gap-8 md:flex-row md:gap-0">
        <div className="flex flex-1 flex-col items-start gap-3 md:gap-5">
          <JmLogo2 className="text-primary h-7 py-1" />
          <p>Made with love and spite</p>
          <p>© 2025 Jake Martin</p>
        </div>
        <div className="flex flex-1 flex-col gap-3 md:gap-5">
          <h3 className="text-primary text-lg font-bold">Contact</h3>
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
          <h3 className="text-primary text-lg font-bold">Navigation</h3>
          <Link href="/">Work</Link>
          <Link href="/fun">Fun</Link>
          <Link href="/about">About</Link>
          <Link href="/resume">Resume</Link>
        </div>
      </footer>
    </Container>
  )
}
