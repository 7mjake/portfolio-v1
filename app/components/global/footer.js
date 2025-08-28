import Container from './Container'
import JmLogo from './svgs/jm-logo'
import { ArrowUpRight } from 'feather-icons-react'

export default function Footer() {
    return (
        <Container>
            <footer className="flex flex-row justify-between items-start mb-6">
                <div className='flex flex-1 flex-col gap-5 items-start'>
                    <JmLogo className='h-7 py-1' />
                    <p>Made with love and spite</p>
                    <p>© 2025 Jake Martin</p>
                </div>
                <div className='flex flex-1 flex-col gap-5'>
                    <h3 className='text-lg font-bold'>Contact</h3>
                    <a href="https://www.linkedin.com/in/jakemartin-design//" className='flex items-center gap-2'>LinkedIn <ArrowUpRight className='size-4' /></a>
                    <a href="https://github.com/7mjake" className='flex items-center gap-2'>GitHub <ArrowUpRight className='size-4' /></a>
                    <a href="mailto:jake@jake.com" className='flex items-center gap-2'>me@jakemartin.design</a>
                </div>
                <div className='flex flex-1 flex-col gap-5'>
                    <h3 className='text-lg font-bold'>Navigation</h3>
                    <a href="/">Work</a>
                    <a href="/fun">Fun</a>
                    <a href="/about">About</a>
                    <a href="/resume">Resume</a>
                </div>
            </footer>
        </Container>
    )
}