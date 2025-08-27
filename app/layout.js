import './globals.css'
import Nav from './components/global/nav'

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
