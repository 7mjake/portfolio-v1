'use client'

import './globals.css'
import Nav from './components/global/nav'
import { Climate_Crisis, Figtree, DM_Mono, Pixelify_Sans } from 'next/font/google'
import Footer from './components/global/footer'
import ThemeProvider from './components/global/ThemeProvider'

const climateCrisis = Climate_Crisis({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-climate-crisis'
})

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-figtree'
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono'
})


const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pixelify-sans'
})


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${figtree.variable} ${climateCrisis.variable} ${dmMono.variable} ${pixelifySans.variable} font-figtree bg-background text-secondary relative`}>
        <ThemeProvider>
          <div
            className="absolute inset-0 pointer-events-none z-50 bg-[url('/images/bg-noise.png')] opacity-50 dark:opacity-100 mix-blend-multiply dark:mix-blend-soft-light bg-repeat"
            style={{
              backgroundSize: 'var(--noise-size) var(--noise-size)',
            }}
          >
          </div>
          <div className="flex flex-col min-h-screen">
            <Nav />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
