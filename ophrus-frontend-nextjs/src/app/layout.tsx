import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Ophrus - Plateforme Immobilière du Congo',
    template: '%s | Ophrus Immobilier'
  },
  description: 'Découvrez les meilleures propriétés au Congo avec Ophrus. Achat, vente et location de biens immobiliers à Brazzaville, Pointe-Noire et dans tout le pays.',
  keywords: ['immobilier', 'Congo', 'Brazzaville', 'Pointe-Noire', 'propriété', 'achat', 'vente', 'location'],
  authors: [{ name: 'Ophrus Immobilier' }],
  creator: 'Ophrus Immobilier',
  publisher: 'Ophrus Immobilier',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ophrus-immobilier.cg'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-CG': '/fr',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CG',
    url: 'https://ophrus-immobilier.cg',
    title: 'Ophrus - Plateforme Immobilière du Congo',
    description: 'Découvrez les meilleures propriétés au Congo avec Ophrus. Achat, vente et location de biens immobiliers.',
    siteName: 'Ophrus Immobilier',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ophrus Immobilier - Plateforme Immobilière du Congo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ophrus - Plateforme Immobilière du Congo',
    description: 'Découvrez les meilleures propriétés au Congo avec Ophrus.',
    images: ['/og-image.jpg'],
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#009fe3" />
        <meta name="msapplication-TileColor" content="#009fe3" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

