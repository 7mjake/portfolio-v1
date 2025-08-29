import Link from 'next/link'
import Container from './Container'
import JmLogo from './svgs/jm-logo'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
    return (
        <Container>
            <div className="flex justify-between pt-6 text-primary items-center">
                <Link href="/">
                    <JmLogo className='fill-primary h-7 py-1' />
                </Link>
                <nav className='flex gap-6 items-center'>
                    <Link href="/">Work</Link>
                    <Link href="/fun">Fun</Link>
                    <Link href="/about">About</Link>
                    <Link href="/resume">Resume</Link>
                    <ThemeToggle />
                </nav>
            </div>
        </Container>
    )
}