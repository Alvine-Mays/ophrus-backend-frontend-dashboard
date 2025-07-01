import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Search, MapPin, Phone, Mail, Star, Users, Building, Award } from 'lucide-react'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Accueil - Trouvez votre propriété de rêve',
  description: 'Ophrus Immobilier vous accompagne dans la recherche de votre propriété idéale au Congo-Brazzaville. Découvrez notre sélection de maisons, appartements et terrains de prestige.',
  openGraph: {
    title: 'Ophrus Immobilier - Trouvez votre propriété de rêve au Congo-Brazzaville',
    description: 'Découvrez notre sélection exclusive de propriétés immobilières de prestige au Congo-Brazzaville.',
    url: '/',
    images: [
      {
        url: '/images/hero-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Propriétés de luxe Ophrus Immobilier',
      },
    ],
  },
}

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Ophrus Immobilier",
  "description": "Agence immobilière spécialisée dans les propriétés de luxe au Congo-Brazzaville",
  "url": "https://ophrus-immobilier.com",
  "logo": "https://ophrus-immobilier.com/images/logo.png",
  "image": "https://ophrus-immobilier.com/images/og-image.jpg",
  "telephone": "+242 06 123 45 67",
  "email": "contact@ophrus-immobilier.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Avenue de l'Indépendance",
    "addressLocality": "Brazzaville",
    "addressRegion": "Pool",
    "postalCode": "00000",
    "addressCountry": "CG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -4.2634,
    "longitude": 15.2429
  },
  "openingHours": [
    "Mo-Fr 08:00-18:00",
    "Sa 09:00-16:00"
  ],
  "priceRange": "$$$$",
  "areaServed": {
    "@type": "Country",
    "name": "Congo-Brazzaville"
  },
  "serviceType": [
    "Vente immobilière",
    "Location immobilière",
    "Conseil en investissement immobilier",
    "Estimation immobilière"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  },
  "sameAs": [
    "https://facebook.com/ophrus.immobilier",
    "https://instagram.com/ophrus_immobilier",
    "https://linkedin.com/company/ophrus-immobilier"
  ]
}

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ophrus Immobilier",
  "url": "https://ophrus-immobilier.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://ophrus-immobilier.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

export default function HomePage() {
  return (
    <>
      <StructuredData data={organizationStructuredData} />
      <StructuredData data={websiteStructuredData} />
      
      <main id="main-content" className="min-h-screen">
        {/* Navigation */}
        <nav className="bg-white shadow-lg sticky top-0 z-50" role="navigation" aria-label="Navigation principale">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Home className="w-8 h-8 text-blue-600" aria-hidden="true" />
                <span className="text-xl font-bold text-gray-900">Ophrus Immobilier</span>
              </div>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  Accueil
                </Link>
                <Link href="/proprietes" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Propriétés
                </Link>
                <Link href="/a-propos" className="text-gray-700 hover:text-blue-600 transition-colors">
                  À propos
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20" aria-labelledby="hero-title">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 id="hero-title" className="text-4xl md:text-6xl font-bold mb-6">
              Trouvez votre propriété de rêve au Congo-Brazzaville
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Découvrez notre sélection exclusive de maisons, appartements et terrains de prestige avec Ophrus Immobilier
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/proprietes" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                aria-label="Voir toutes les propriétés disponibles"
              >
                <Search className="w-5 h-5 mr-2" aria-hidden="true" />
                Voir les propriétés
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
                aria-label="Contacter notre équipe"
              >
                <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                Nous contacter
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gray-50" aria-labelledby="services-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="services-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos Services Immobiliers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une expertise complète pour tous vos projets immobiliers au Congo-Brazzaville
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <article className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4">
                  <Building className="w-12 h-12" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Vente de Propriétés</h3>
                <p className="text-gray-600">
                  Découvrez notre sélection de maisons, appartements et terrains de prestige à vendre dans tout le Congo-Brazzaville.
                </p>
              </article>
              
              <article className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4">
                  <MapPin className="w-12 h-12" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Location Immobilière</h3>
                <p className="text-gray-600">
                  Trouvez la location parfaite parmi notre large gamme de propriétés disponibles à la location.
                </p>
              </article>
              
              <article className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4">
                  <Award className="w-12 h-12" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Conseil Expert</h3>
                <p className="text-gray-600">
                  Bénéficiez de nos conseils d'experts pour vos investissements et projets immobiliers.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-blue-600 text-white" aria-labelledby="stats-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="stats-title" className="sr-only">Nos statistiques</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Propriétés vendues</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-blue-100">Clients satisfaits</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-blue-100">Années d'expérience</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Taux de satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white" aria-labelledby="contact-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="contact-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prêt à trouver votre propriété idéale ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Contactez notre équipe d'experts dès aujourd'hui pour une consultation personnalisée
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+24206123456" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                aria-label="Appeler Ophrus Immobilier"
              >
                <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                +242 06 123 45 67
              </a>
              <a 
                href="mailto:contact@ophrus-immobilier.com" 
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors inline-flex items-center justify-center"
                aria-label="Envoyer un email à Ophrus Immobilier"
              >
                <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
                Nous écrire
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Home className="w-6 h-6" aria-hidden="true" />
                  <span className="text-lg font-bold">Ophrus Immobilier</span>
                </div>
                <p className="text-gray-400">
                  Votre partenaire de confiance pour l'immobilier de prestige au Congo-Brazzaville.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/proprietes/vente" className="hover:text-white transition-colors">Vente</Link></li>
                  <li><Link href="/proprietes/location" className="hover:text-white transition-colors">Location</Link></li>
                  <li><Link href="/services/estimation" className="hover:text-white transition-colors">Estimation</Link></li>
                  <li><Link href="/services/conseil" className="hover:text-white transition-colors">Conseil</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/a-propos" className="hover:text-white transition-colors">À propos</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
                  <li><Link href="/politique-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <div className="space-y-2 text-gray-400">
                  <p>123 Avenue de l'Indépendance</p>
                  <p>Brazzaville, Congo</p>
                  <p>+242 06 123 45 67</p>
                  <p>contact@ophrus-immobilier.com</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Ophrus Immobilier. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

