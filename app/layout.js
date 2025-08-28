import './globals.css'
import Nav from './components/global/nav'
import { Climate_Crisis } from 'next/font/google'

const climateCrisis = Climate_Crisis({ 
  subsets: ['latin'],
  weight: '400'
})

export const metadata = {
  title: 'Jake Martin',
  description: 'Designer / Developer / Maker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Nav />
        {children}
      </body>
    </html>
  )
}
