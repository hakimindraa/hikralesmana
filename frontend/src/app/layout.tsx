import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Font tipis dan elegan untuk photographer portfolio
const headingFont = Inter({
  subsets: ['latin'],
  weight: ['200', '300'],
  variable: '--font-heading',
  display: 'swap',
})

const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hikra Portfolio | Photography & Videography',
  description: 'Professional Photography, Photo Editing & Videography Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="font-body bg-neutral-50 text-neutral-800">{children}</body>
    </html>
  )
}
