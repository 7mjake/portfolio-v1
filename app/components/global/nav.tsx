'use client'

import Link from './Link'
import Container from './Container'
import JmLogo2 from './svgs/jm-logo-2'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect } from 'react'
import { Menu, X } from 'feather-icons-react'
import { usePathname } from 'next/navigation'
import ClickAwayListener from 'react-click-away-listener'
import clsx from 'clsx'
import { navigationItems } from '../../data/navigation'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(prev => !prev)
  }

  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href

  const navigationLinks = () =>
    navigationItems.map(item => (
      <Link
        href={item.href}
        key={item.href}
        className={clsx(isActive(item.href) && 'font-bold')}
      >
        {item.label}
      </Link>
    ))

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div
        className={
          'from-background to-background/50 border-primary fixed top-0 right-0 left-0 z-10 border-b-[3px] bg-gradient-to-b backdrop-blur-sm md:border-b-0'
        }
      >
        <Container>
          <div className="text-primary md:border-primary flex items-center justify-between py-4 md:-mx-[3px] md:border-b-[3px] md:py-6">
            <Link href="/" animate={false}>
              <JmLogo2 className="fill-primary h-8 py-1 md:h-7" />
            </Link>
            <nav aria-label="Primary navigation" className="hidden flex-col items-center gap-2 md:flex md:flex-row">
              {navigationLinks()}
              <ThemeToggle />
            </nav>
            <button
              className="focus-visible:ring-primary rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
              onClick={handleClick}
              aria-controls="mobile-navigation"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isOpen ? <X className="size-8" /> : <Menu className="size-8" />}
            </button>
          </div>
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className={clsx(
              'text-primary flex flex-col items-end gap-4 overflow-hidden text-6xl transition-all duration-300 md:hidden',
              isOpen ? 'max-h-screen pb-8 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            {navigationLinks()}
            <ThemeToggle />
          </nav>
        </Container>
      </div>
    </ClickAwayListener>
  )
}
