import Link from 'next/link'
import Container from './Container'
import JmLogo from './svgs/jm-logo'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'
import { Menu } from 'feather-icons-react'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div
      className={
        'from-background to-background/50 border-primary fixed top-0 right-0 left-0 z-10 border-b-[3px] bg-gradient-to-b backdrop-blur-sm'
      }
    >
      <Container>
        <div className="text-primary -mx-[3px] flex items-center justify-between py-6">
          <Link href="/">
            <JmLogo className="fill-primary h-7 py-1" />
          </Link>
          <nav className="hidden flex-col items-center gap-6 md:flex md:flex-row">
            <Link href="/">Work</Link>
            <Link href="/fun">Fun</Link>
            <Link href="/about">About</Link>
            <Link href="/resume">Resume</Link>
            <ThemeToggle />
          </nav>
          <button className="md:hidden" onClick={handleClick}>
            <Menu className="size-6" />
          </button>
        </div>
        {isOpen && (
          <nav className="flex flex-col items-center gap-6">
            <Link href="/">Work</Link>
            <Link href="/fun">Fun</Link>
            <Link href="/about">About</Link>
            <Link href="/resume">Resume</Link>
            <ThemeToggle />
          </nav>
        )}
      </Container>
    </div>
  )
}
