import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: 'Ophrus - Plateforme Immobilière Moderne',
    template: '%s | Ophrus'
  },
  description: 'Découvrez la plateforme immobilière nouvelle génération. Trouvez votre propriété idéale avec Ophrus - recherche avancée, visites virtuelles et gestion complète.',
  keywords: [
    'immobilier',
    'propriété',
    'achat',
    'vente',
    'location',
    'appartement',
    'maison',
    'terrain',
    'investissement immobilier',
    'ophrus'
  ],
  authors: [{ name: 'Ophrus Team' }],
  creator: 'Ophrus',
  publisher: 'Ophrus',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ophrus.com'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/fr',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://ophrus.com',
    title: 'Ophrus - Plateforme Immobilière Moderne',
    description: 'Découvrez la plateforme immobilière nouvelle génération. Trouvez votre propriété idéale avec Ophrus.',
    siteName: 'Ophrus',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ophrus - Plateforme Immobilière',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ophrus - Plateforme Immobilière Moderne',
    description: 'Découvrez la plateforme immobilière nouvelle génération.',
    images: ['/images/twitter-image.jpg'],
    creator: '@ophrus',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Ophrus',
              url: 'https://ophrus.com',
              logo: 'https://ophrus.com/images/logo.png',
              description: 'Plateforme immobilière moderne pour l\'achat, la vente et la location de propriétés.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'FR',
              },
              sameAs: [
                'https://facebook.com/ophrus',
                'https://twitter.com/ophrus',
                'https://linkedin.com/company/ophrus',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}

