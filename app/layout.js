'use client'

import './globals.css'
import Nav from './components/global/nav'
import {
  Climate_Crisis,
  Figtree,
  DM_Mono,
  Pixelify_Sans,
} from 'next/font/google'
import localFont from 'next/font/local'
import Footer from './components/global/footer'
import ThemeProvider from './components/global/ThemeProvider'

const climateCrisis = Climate_Crisis({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-climate-crisis',
})

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-figtree',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
})

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pixelify-sans',
})

const advercase = localFont({
  src: '../public/fonts/AdvercaseFont-Demo-Regular.otf',
  variable: '--font-advercase',
})

const newake = localFont({
  src: '../public/fonts/Newake-Font-Demo.otf',
  variable: '--font-newake',
})

const poiAeronaut = localFont({
  src: '../public/fonts/POIAeronautTrial-Regular.otf',
  variable: '--font-poi-aeronaut',
})

const ppMonumentExtended = localFont({
  src: '../public/fonts/PPMonumentExtended-Black.otf',
  variable: '--font-pp-monument-extended',
})

const ppMori = localFont({
  src: '../public/fonts/PPMori-SemiBold.otf',
  variable: '--font-pp-mori',
})

const thunder = localFont({
  src: '../public/fonts/Thunder-BoldLC.woff2',
  variable: '--font-thunder',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased ${figtree.variable} ${climateCrisis.variable} ${dmMono.variable} ${pixelifySans.variable} ${advercase.variable} ${newake.variable} ${poiAeronaut.variable} ${ppMonumentExtended.variable} ${ppMori.variable} ${thunder.variable} font-figtree bg-background text-secondary relative`}
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
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
