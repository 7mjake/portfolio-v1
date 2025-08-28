import './globals.css'
import Nav from './components/global/nav'
import { Climate_Crisis, Figtree } from 'next/font/google'

const climateCrisis = Climate_Crisis({ 
  subsets: ['latin'],
  weight: '400'
})

const figtree = Figtree({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-figtree'
})

export const metadata = {
  title: 'Jake Martin',
  description: 'Designer / Developer / Maker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased ${figtree.variable} font-figtree`}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
