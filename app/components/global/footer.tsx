import Container from './Container'
import JmLogo2 from './svgs/jm-logo-2'
import { ArrowUpRight } from 'feather-icons-react'
import Link from './Link'
import Heading from './Heading'
import { navigationItems } from '../../data/navigation'

export default function Footer() {
  return (
    <Container>
      <footer className="mb-24 flex flex-col items-start justify-between gap-8 text-lg md:flex-row md:gap-12">
        <div className="flex flex-1 flex-col items-start gap-3 md:gap-5">
          <JmLogo2 className="text-primary h-8 py-1" />
          <p className="text-pretty">Lovingly crafted with React</p>
          <p>© {new Date().getFullYear()} Jake Martin</p>
        </div>
        <div className="flex flex-1 flex-col gap-3 md:gap-5">
          <Heading as="h2" variant="label">Contact</Heading>
          <Link
            href="https://www.linkedin.com/in/jakemartin-design//"
            className="flex items-center gap-2"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <ArrowUpRight className="size-4" />
          </Link>
          <Link
            href="https://github.com/7mjake"
            className="flex items-center gap-2"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight className="size-4" />
          </Link>
          <Link href="mailto:jake@jake.com" className="flex items-center gap-2">
            me@jakemartin.design
          </Link>
        </div>
        <div className="flex flex-1 flex-col gap-3 md:gap-5">
          <Heading as="h2" variant="label">Navigation</Heading>
          {navigationItems.map(item => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </div>
      </footer>
    </Container>
  )
}
