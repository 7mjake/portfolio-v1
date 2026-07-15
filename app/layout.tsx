import './globals.css'
import Nav from './components/global/nav'
import { Figtree } from 'next/font/google'
import localFont from 'next/font/local'
import Footer from './components/global/footer'
import ThemeProvider from './components/global/ThemeProvider'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const newake = localFont({
  src: '../public/fonts/Newake-Font-Demo.otf',
  variable: '--font-newake',
})

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-figtree',
})

export const metadata: Metadata = {
  title: {
    default: 'Jake Martin — Designer, Developer, Maker',
    template: '%s | Jake Martin',
  },
  description: 'The portfolio of Jake Martin, a designer, developer, and maker in New York City.',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased ${figtree.variable} ${newake.variable} font-figtree bg-background text-secondary relative`}
      >
        <ThemeProvider>
          <div
            className="pointer-events-none absolute inset-0 z-50 bg-[url('/images/bg-noise.png')] bg-repeat opacity-50 mix-blend-multiply dark:opacity-100 dark:mix-blend-soft-light"
            style={{
              backgroundSize: 'var(--noise-size) var(--noise-size)',
            }}
          ></div>
          <div className="flex min-h-screen flex-col">
            <Nav />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
