import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Ophrus Immobilier - Propriétés de Luxe au Congo-Brazzaville',
    template: '%s | Ophrus Immobilier'
  },
  description: 'Découvrez les plus belles propriétés immobilières au Congo-Brazzaville. Achat, vente et location de maisons, appartements et terrains de prestige avec Ophrus Immobilier.',
  keywords: ['immobilier Congo', 'propriétés Brazzaville', 'achat maison Congo', 'location appartement Brazzaville', 'terrain à vendre Congo', 'immobilier de luxe'],
  authors: [{ name: 'Ophrus Immobilier' }],
  creator: 'Ophrus Immobilier',
  publisher: 'Ophrus Immobilier',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ophrus-immobilier.com'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-CG': '/fr',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CG',
    url: 'https://ophrus-immobilier.com',
    title: 'Ophrus Immobilier - Propriétés de Luxe au Congo-Brazzaville',
    description: 'Découvrez les plus belles propriétés immobilières au Congo-Brazzaville. Achat, vente et location de maisons, appartements et terrains de prestige.',
    siteName: 'Ophrus Immobilier',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ophrus Immobilier - Propriétés de Luxe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ophrus Immobilier - Propriétés de Luxe au Congo-Brazzaville',
    description: 'Découvrez les plus belles propriétés immobilières au Congo-Brazzaville.',
    images: ['/images/twitter-image.jpg'],
    creator: '@ophrus_immobilier',
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#009fe3" />
        <meta name="msapplication-TileColor" content="#009fe3" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>
        <div id="skip-to-content">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded">
            Aller au contenu principal
          </a>
        </div>
        {children}
      </body>
    </html>
  )
}

