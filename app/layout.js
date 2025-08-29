'use client'

import './globals.css'
import Nav from './components/global/nav'
import { Climate_Crisis, Figtree } from 'next/font/google'
import Footer from './components/global/footer'
import ThemeProvider from './components/global/ThemeProvider'

const climateCrisis = Climate_Crisis({
  subsets: ['latin'],
  weight: '400'
})

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-figtree'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${figtree.variable} ${climateCrisis.variable} font-figtree bg-background text-secondary relative`}>
        <ThemeProvider>
          <div
            className="absolute inset-0 pointer-events-none z-50 bg-[url('/images/bg-noise.png')] opacity-75 dark:opacity-100 mix-blend-multiply dark:mix-blend-soft-light bg-repeat"
            style={{
              backgroundSize: '600px 600px',
            }}
          >
          </div>
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
