import Link from 'next/link'
import Container from './Container'
import { Sun, Moon } from 'feather-icons-react'
import Image from 'next/image'
import JmLogo from './svgs/jm-logo'

export default function Nav() {
    return (
        <Container>
            <div className="flex justify-between pt-6 text-primary">
                <Link href="/">
                    <JmLogo className='fill-primary' />
                </Link>
                <nav className='flex gap-6'>
                    <Link href="/">Work</Link>
                    <Link href="/fun">Fun</Link>
                    <Link href="/about">About</Link>
                    <Link href="/resume">Resume</Link>
                    <button><Sun /></button>
                </nav>
            </div>
        </Container>
    )
}