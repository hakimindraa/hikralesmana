import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import FloatingButtons from '@/components/FloatingButtons'
import PageTransition from '@/components/PageTransition'

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
  metadataBase: new URL('https://hikralesmana.com'), // Ganti dengan domain Anda
  title: {
    default: 'Hikra Lesmana | Professional Photography & Videography Portfolio',
    template: '%s | Hikra Lesmana'
  },
  description: 'Hikra Lesmana - Professional photographer and videographer based in Tanjungpinang, Kepulauan Riau. Specializing in wedding photography, product photography, corporate video, and event coverage. View my portfolio and get in touch for your next project.',
  keywords: [
    'hikralesmana',
    'hikra lesmana',
    'photographer tanjungpinang',
    'videographer tanjungpinang',
    'wedding photographer kepri',
    'product photography',
    'corporate video',
    'event photographer',
    'photography portfolio',
    'videography services',
    'tanjungpinang photographer',
    'kepulauan riau photographer'
  ],
  authors: [{ name: 'Hikra Lesmana' }],
  creator: 'Hikra Lesmana',
  publisher: 'Hikra Lesmana',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://hikralesmana.com',
    title: 'Hikra Lesmana | Professional Photography & Videography',
    description: 'Professional photographer and videographer in Tanjungpinang. Specializing in wedding, product, and event photography. View portfolio and contact for bookings.',
    siteName: 'Hikra Lesmana Portfolio',
    images: [
      {
        url: '/og-image.jpg', // Nanti buat file ini
        width: 1200,
        height: 630,
        alt: 'Hikra Lesmana Photography Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hikra Lesmana | Professional Photography & Videography',
    description: 'Professional photographer and videographer in Tanjungpinang. View portfolio and contact for bookings.',
    images: ['/og-image.jpg'],
    creator: '@hakimlesmna', // Ganti dengan Twitter handle Anda
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '8G7U4siDE0YByEniKgVxsQOM0_wFFZpmPeIoXSnsJTM', // Nanti dari Google Search Console
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head>
        {/* Structured Data - Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Hikra Lesmana',
              alternateName: 'hikralesmana',
              url: 'https://hikralesmana.com',
              image: 'https://hikralesmana.com/profile.jpg',
              jobTitle: 'Professional Photographer & Videographer',
              worksFor: {
                '@type': 'Organization',
                name: 'Hikra Lesmana Photography'
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Tanjungpinang',
                addressRegion: 'Kepulauan Riau',
                addressCountry: 'ID'
              },
              email: 'hakimindralesmana@gmail.com',
              telephone: '+6283137412551',
              sameAs: [
                'https://www.instagram.com/hakimlesmna',
                'https://github.com/hakimindraa',
                'https://wa.me/6283137412551'
              ]
            })
          }}
        />
        {/* Structured Data - Professional Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Hikra Lesmana Photography',
              image: 'https://hikralesmana.com/og-image.jpg',
              '@id': 'https://hikralesmana.com',
              url: 'https://hikralesmana.com',
              telephone: '+6283137412551',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Tanjungpinang',
                addressRegion: 'Kepulauan Riau',
                addressCountry: 'ID'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 0.9167,
                longitude: 104.4500
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday'
                ],
                opens: '09:00',
                closes: '18:00'
              },
              sameAs: [
                'https://www.instagram.com/hakimlesmna',
                'https://github.com/hakimindraa'
              ]
            })
          }}
        />
      </head>
      <body className="font-body bg-neutral-50 text-neutral-800">
        <PageTransition>
          {children}
        </PageTransition>
        <FloatingButtons />
      </body>
    </html>
  )
}
