import { Metadata } from 'next'
import Link from 'next/link'
import { Home, Users, Award, Target, Heart, Shield } from 'lucide-react'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'À Propos - Notre Histoire et Notre Mission',
  description: 'Découvrez l\'histoire d\'Ophrus Immobilier, leader de l\'immobilier de luxe au Congo-Brazzaville depuis 15 ans. Notre mission : vous accompagner dans tous vos projets immobiliers.',
  keywords: ['Ophrus Immobilier histoire', 'agence immobilière Congo', 'équipe immobilier Brazzaville', 'mission Ophrus', 'valeurs immobilier'],
  openGraph: {
    title: 'À Propos d\'Ophrus Immobilier - Leader de l\'Immobilier au Congo',
    description: 'Découvrez notre histoire, notre mission et notre équipe d\'experts en immobilier de luxe au Congo-Brazzaville.',
    url: '/a-propos',
    images: [
      {
        url: '/images/about-team.jpg',
        width: 1200,
        height: 630,
        alt: 'Équipe Ophrus Immobilier',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À Propos d\'Ophrus Immobilier - Leader de l\'Immobilier au Congo',
    description: 'Découvrez notre histoire, notre mission et notre équipe d\'experts.',
    images: ['/images/about-team.jpg'],
  },
}

const aboutPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "À Propos d'Ophrus Immobilier",
  "description": "Page présentant l'histoire, la mission et l'équipe d'Ophrus Immobilier",
  "url": "https://ophrus-immobilier.com/a-propos",
  "mainEntity": {
    "@type": "RealEstateAgent",
    "name": "Ophrus Immobilier",
    "foundingDate": "2010",
    "founder": {
      "@type": "Person",
      "name": "Équipe fondatrice Ophrus"
    },
    "numberOfEmployees": "25",
    "slogan": "Votre partenaire de confiance pour l'immobilier de prestige",
    "knowsAbout": [
      "Immobilier de luxe",
      "Vente de propriétés",
      "Location immobilière",
      "Conseil en investissement",
      "Estimation immobilière"
    ]
  }
}

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://ophrus-immobilier.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "À propos",
      "item": "https://ophrus-immobilier.com/a-propos"
    }
  ]
}

export default function AboutPage() {
  return (
    <>
      <StructuredData data={aboutPageStructuredData} />
      <StructuredData data={breadcrumbStructuredData} />
      
      <main className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-lg sticky top-0 z-50" role="navigation" aria-label="Navigation principale">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <Home className="w-8 h-8 text-blue-600" aria-hidden="true" />
                <span className="text-xl font-bold text-gray-900">Ophrus Immobilier</span>
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Accueil
                </Link>
                <Link href="/proprietes" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Propriétés
                </Link>
                <Link href="/a-propos" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  À propos
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-700">
                  Accueil
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-900 font-medium">À propos</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                À Propos d'Ophrus Immobilier
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Depuis 15 ans, nous sommes le partenaire de confiance pour l'immobilier de prestige au Congo-Brazzaville. 
                Découvrez notre histoire, notre mission et les valeurs qui nous animent.
              </p>
            </div>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
                <div className="prose prose-lg text-gray-700">
                  <p className="mb-4">
                    Fondée en 2010, Ophrus Immobilier est née de la vision de créer une agence immobilière 
                    d'exception au Congo-Brazzaville. Nos fondateurs, passionnés par l'immobilier et animés 
                    par l'excellence, ont voulu révolutionner le marché immobilier congolais.
                  </p>
                  <p className="mb-4">
                    Au fil des années, nous avons bâti notre réputation sur la qualité de nos services, 
                    l'expertise de notre équipe et notre connaissance approfondie du marché local. 
                    Aujourd'hui, nous sommes fiers d'être reconnus comme l'une des agences immobilières 
                    les plus prestigieuses du pays.
                  </p>
                  <p>
                    Avec plus de 500 propriétés vendues et 1000 clients satisfaits, nous continuons 
                    d'innover pour offrir une expérience immobilière exceptionnelle à chacun de nos clients.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-medium">Notre équipe en action</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre Mission */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Mission</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Accompagner chaque client dans la réalisation de ses projets immobiliers avec expertise, 
                transparence et dévouement.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  Nous visons l'excellence dans chaque aspect de notre service, de la première consultation 
                  à la finalisation de votre projet immobilier.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Passion</h3>
                <p className="text-gray-600">
                  Notre passion pour l'immobilier nous pousse à toujours rechercher les meilleures 
                  opportunités pour nos clients.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Confiance</h3>
                <p className="text-gray-600">
                  La confiance est au cœur de notre relation client. Nous nous engageons à être 
                  transparents et honnêtes dans tous nos échanges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Notre Équipe */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une équipe de 25 professionnels passionnés et expérimentés, dédiés à votre réussite immobilière.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="bg-blue-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-white" aria-hidden="true" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">25</div>
                <div className="text-gray-600">Experts immobiliers</div>
              </div>
              
              <div>
                <div className="bg-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-12 h-12 text-white" aria-hidden="true" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">15</div>
                <div className="text-gray-600">Années d'expérience</div>
              </div>
              
              <div>
                <div className="bg-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-12 h-12 text-white" aria-hidden="true" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600">Propriétés vendues</div>
              </div>
              
              <div>
                <div className="bg-orange-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-12 h-12 text-white" aria-hidden="true" />
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-gray-600">Clients satisfaits</div>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Engagements */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Engagements</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des promesses que nous tenons chaque jour pour garantir votre satisfaction.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Accompagnement Personnalisé</h3>
                <p className="text-gray-600">
                  Chaque client est unique. Nous adaptons notre approche à vos besoins spécifiques 
                  et vous accompagnons à chaque étape de votre projet immobilier.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Transparence Totale</h3>
                <p className="text-gray-600">
                  Pas de surprises, pas de frais cachés. Nous vous informons clairement de tous 
                  les aspects de votre transaction immobilière.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Expertise Locale</h3>
                <p className="text-gray-600">
                  Notre connaissance approfondie du marché congolais nous permet de vous offrir 
                  les meilleurs conseils et opportunités.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Service Après-Vente</h3>
                <p className="text-gray-600">
                  Notre relation ne s'arrête pas à la signature. Nous restons disponibles pour 
                  vous accompagner même après votre acquisition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à nous faire confiance ?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Rejoignez les centaines de clients qui nous ont fait confiance pour leurs projets immobiliers. 
              Contactez-nous dès aujourd'hui pour une consultation gratuite.
            </p>
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Nous contacter
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

