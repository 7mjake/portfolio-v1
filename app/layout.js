import './globals.css'

export const metadata = {
  title: 'Jake Martin - Portfolio',
  description: 'Full Stack Developer & Creative Technologist',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
