import { Metadata } from 'next'
import Link from 'next/link'
import { Home, MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Contact - Nous Joindre pour Vos Projets Immobiliers',
  description: 'Contactez Ophrus Immobilier pour tous vos projets immobiliers au Congo-Brazzaville. Équipe disponible 6j/7, consultation gratuite. Téléphone, email, bureau à Brazzaville.',
  keywords: ['contact Ophrus Immobilier', 'agence immobilière Brazzaville contact', 'téléphone immobilier Congo', 'rendez-vous immobilier', 'consultation gratuite'],
  openGraph: {
    title: 'Contactez Ophrus Immobilier - Experts Immobilier Congo-Brazzaville',
    description: 'Prenez contact avec notre équipe d\'experts pour tous vos projets immobiliers. Consultation gratuite et accompagnement personnalisé.',
    url: '/contact',
    images: [
      {
        url: '/images/contact-office.jpg',
        width: 1200,
        height: 630,
        alt: 'Bureau Ophrus Immobilier Brazzaville',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contactez Ophrus Immobilier - Experts Immobilier Congo',
    description: 'Prenez contact avec notre équipe d\'experts pour tous vos projets immobiliers.',
    images: ['/images/contact-office.jpg'],
  },
}

const contactPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Ophrus Immobilier",
  "description": "Page de contact pour joindre l'équipe d'Ophrus Immobilier",
  "url": "https://ophrus-immobilier.com/contact",
  "mainEntity": {
    "@type": "RealEstateAgent",
    "name": "Ophrus Immobilier",
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
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+242 06 123 45 67",
        "contactType": "customer service",
        "availableLanguage": ["French"],
        "areaServed": "CG"
      },
      {
        "@type": "ContactPoint",
        "email": "contact@ophrus-immobilier.com",
        "contactType": "customer service",
        "availableLanguage": ["French"],
        "areaServed": "CG"
      }
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
      "name": "Contact",
      "item": "https://ophrus-immobilier.com/contact"
    }
  ]
}

export default function ContactPage() {
  return (
    <>
      <StructuredData data={contactPageStructuredData} />
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
                <Link href="/a-propos" className="text-gray-700 hover:text-blue-600 transition-colors">
                  À propos
                </Link>
                <Link href="/contact" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
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
              <li className="text-gray-900 font-medium">Contact</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Contactez-Nous
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Notre équipe d'experts est à votre disposition pour vous accompagner dans tous vos projets immobiliers. 
                Consultation gratuite et accompagnement personnalisé garantis.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Nos Coordonnées</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <MapPin className="w-6 h-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                      <p className="text-gray-600">
                        123 Avenue de l'Indépendance<br />
                        Brazzaville, Congo-Brazzaville<br />
                        République du Congo
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Phone className="w-6 h-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                      <p className="text-gray-600">
                        <a href="tel:+24206123456" className="hover:text-blue-600 transition-colors">
                          +242 06 123 45 67
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">Disponible 6j/7 de 8h à 18h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Mail className="w-6 h-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:contact@ophrus-immobilier.com" className="hover:text-blue-600 transition-colors">
                          contact@ophrus-immobilier.com
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">Réponse sous 24h garantie</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Clock className="w-6 h-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Horaires d'ouverture</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Lundi - Vendredi : 8h00 - 18h00</p>
                        <p>Samedi : 9h00 - 16h00</p>
                        <p>Dimanche : Fermé</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Nous Trouver</h3>
                  <div className="w-full h-64 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg font-medium">Carte interactive - Bureau Brazzaville</span>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Envoyez-nous un Message</h2>
                <p className="text-gray-600 mb-8">
                  Remplissez le formulaire ci-dessous et notre équipe vous recontactera dans les plus brefs délais.
                </p>
                
                <form className="space-y-6" action="#" method="POST">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Votre prénom"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+242 06 123 45 67"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="achat">Achat d'une propriété</option>
                      <option value="vente">Vente d'une propriété</option>
                      <option value="location">Location</option>
                      <option value="estimation">Estimation gratuite</option>
                      <option value="conseil">Conseil en investissement</option>
                      <option value="autre">Autre demande</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Décrivez votre projet immobilier ou votre demande..."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      className="mt-1 mr-3"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      J'accepte que mes données personnelles soient utilisées pour me recontacter concernant ma demande. *
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                    Envoyer le Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions Fréquentes</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Trouvez rapidement les réponses aux questions les plus courantes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Combien coûtent vos services ?
                </h3>
                <p className="text-gray-600 mb-6">
                  Nos honoraires varient selon le type de service. La consultation initiale est toujours gratuite. 
                  Nous vous fournirons un devis détaillé après étude de votre projet.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Dans quelles zones intervenez-vous ?
                </h3>
                <p className="text-gray-600 mb-6">
                  Nous couvrons tout le Congo-Brazzaville, avec une expertise particulière sur Brazzaville, 
                  Pointe-Noire et les principales villes du pays.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Combien de temps pour vendre une propriété ?
                </h3>
                <p className="text-gray-600 mb-6">
                  Le délai moyen de vente est de 3 à 6 mois selon le type de bien et sa localisation. 
                  Notre expertise nous permet d'optimiser ce délai.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Proposez-vous des visites virtuelles ?
                </h3>
                <p className="text-gray-600 mb-6">
                  Oui, nous proposons des visites virtuelles 360° pour la plupart de nos propriétés, 
                  ainsi que des visites vidéo en direct sur demande.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

