import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'

import './globals.css'

const _playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tressora - Salon Owner Dashboard',
  description: 'Premium salon management dashboard for complete operational control, analytics, and business optimization.',
}

export const viewport: Viewport = {
  themeColor: '#5C3A1E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_playfair.variable} ${_inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
