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
    default: 'Ophrus Immobilier - Votre partenaire de confiance au Congo-Brazzaville',
    template: '%s | Ophrus Immobilier'
  },
  description: 'Découvrez la plateforme immobilière moderne du Congo-Brazzaville. Trouvez votre propriété idéale avec Ophrus - recherche avancée, transactions sécurisées et accompagnement personnalisé.',
  keywords: [
    'immobilier',
    'Congo-Brazzaville',
    'Brazzaville',
    'Pointe-Noire',
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
      'fr-FR': '/fr',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://ophrus-immobilier.com',
    title: 'Ophrus Immobilier - Votre partenaire de confiance au Congo-Brazzaville',
    description: 'Découvrez la plateforme immobilière moderne du Congo-Brazzaville. Trouvez votre propriété idéale avec Ophrus.',
    siteName: 'Ophrus Immobilier',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ophrus Immobilier - Plateforme Immobilière Congo-Brazzaville',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ophrus Immobilier - Votre partenaire de confiance au Congo-Brazzaville',
    description: 'Découvrez la plateforme immobilière moderne du Congo-Brazzaville.',
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
        <meta name="theme-color" content="#009fe3" />
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
              name: 'Ophrus Immobilier',
              url: 'https://ophrus-immobilier.com',
              logo: 'https://ophrus-immobilier.com/images/logo.png',
              description: 'Plateforme immobilière moderne pour l\'achat, la vente et la location de propriétés au Congo-Brazzaville.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'CG',
                addressLocality: 'Brazzaville',
              },
              sameAs: [
                'https://facebook.com/ophrus.immobilier',
                'https://twitter.com/ophrus_immobilier',
                'https://linkedin.com/company/ophrus-immobilier',
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

