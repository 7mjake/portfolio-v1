import Link from './Link'
import Container from './Container'
import JmLogo from './svgs/jm-logo'
import JmLogo2 from './svgs/jm-logo-2'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect } from 'react'
import { Menu, X } from 'feather-icons-react'
import { usePathname } from 'next/navigation'
import ClickAwayListener from 'react-click-away-listener'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(prev => !prev)
  }

  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const activeClass = 'font-bold'

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div
        className={
          'from-background to-background/50 border-primary fixed top-0 right-0 left-0 z-10 border-b-[3px] bg-gradient-to-b backdrop-blur-sm md:border-b-0'
        }
      >
        <Container>
          <div className="text-primary md:border-primary flex items-center justify-between py-4 md:-mx-[3px] md:border-b-[3px] md:py-6">
            <Link href="/">
              <JmLogo2 className="fill-primary h-8 py-1 md:h-7" />
            </Link>
            <nav className="hidden flex-col items-center gap-2 md:flex md:flex-row">
              <Link href="/" className={pathname === '/' ? activeClass : ''}>
                Work
              </Link>
              <Link
                href="/fun"
                className={pathname === '/fun' ? activeClass : ''}
              >
                Fun
              </Link>
              <Link
                href="/about"
                className={pathname === '/about' ? activeClass : ''}
              >
                About
              </Link>
              <Link href="/resume">Resume</Link>
              <ThemeToggle />
            </nav>
            <button className="md:hidden" onClick={handleClick}>
              {isOpen ? <X className="size-8" /> : <Menu className="size-8" />}
            </button>
          </div>
          {isOpen && (
            <nav className="text-primary flex flex-col items-end gap-4 pb-8 text-6xl md:hidden">
              <Link href="/" className={pathname === '/' ? activeClass : ''}>
                Work
              </Link>
              <Link
                href="/fun"
                className={pathname === '/fun' ? activeClass : ''}
              >
                Fun
              </Link>
              <Link
                href="/about"
                className={pathname === '/about' ? activeClass : ''}
              >
                About
              </Link>
              <Link href="/resume">Resume</Link>
              <ThemeToggle />
            </nav>
          )}
        </Container>
      </div>
    </ClickAwayListener>
  )
}
