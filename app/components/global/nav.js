import Link from 'next/link'
import Container from './Container'

export default function Nav() {
    return (
        <Container>
        <div className="flex justify-between m-4">
            <Link href="/">Logo</Link>
            <nav>
                <Link href="/">Work</Link>
                <Link href="/fun">Fun</Link>
                <Link href="/about">About</Link>
                <Link href="/resume">Resume</Link>
            </nav>
        </div>
        </Container>
    )
}