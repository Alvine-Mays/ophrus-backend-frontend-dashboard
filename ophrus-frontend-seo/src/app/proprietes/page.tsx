import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Home, MapPin, Bed, Bath, Square, Euro } from 'lucide-react'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Propriétés à Vendre et à Louer - Sélection Premium',
  description: 'Découvrez notre sélection exclusive de propriétés immobilières au Congo-Brazzaville. Maisons, appartements et terrains de prestige disponibles à la vente et à la location.',
  keywords: ['propriétés Congo', 'maisons à vendre Brazzaville', 'appartements location Congo', 'immobilier luxe Brazzaville', 'terrain à vendre Congo'],
  openGraph: {
    title: 'Propriétés Premium au Congo-Brazzaville | Ophrus Immobilier',
    description: 'Explorez notre collection exclusive de propriétés de luxe au Congo-Brazzaville. Trouvez votre maison, appartement ou terrain idéal.',
    url: '/proprietes',
    images: [
      {
        url: '/images/properties-collection.jpg',
        width: 1200,
        height: 630,
        alt: 'Collection de propriétés Ophrus Immobilier',
      },
    ],
  },
}

// Données d'exemple pour les propriétés
const properties = [
  {
    id: 1,
    title: "Villa Moderne avec Piscine",
    description: "Magnifique villa contemporaine de 5 chambres avec piscine privée et jardin paysager",
    price: 250000000,
    type: "Vente",
    location: "Bacongo, Brazzaville",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    images: ["/images/villa-moderne-1.jpg"],
    features: ["Piscine", "Jardin", "Garage", "Climatisation", "Sécurité 24h"]
  },
  {
    id: 2,
    title: "Appartement de Standing Centre-Ville",
    description: "Appartement luxueux de 3 pièces au cœur de Brazzaville avec vue panoramique",
    price: 800000,
    type: "Location",
    location: "Centre-ville, Brazzaville",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    images: ["/images/appartement-standing-1.jpg"],
    features: ["Vue panoramique", "Ascenseur", "Parking", "Climatisation"]
  },
  {
    id: 3,
    title: "Terrain Constructible Vue Mer",
    description: "Terrain de 1000m² avec vue imprenable sur le fleuve Congo, idéal pour construction",
    price: 80000000,
    type: "Vente",
    location: "Pointe-Noire",
    bedrooms: 0,
    bathrooms: 0,
    area: 1000,
    images: ["/images/terrain-vue-mer-1.jpg"],
    features: ["Vue fleuve", "Constructible", "Viabilisé", "Accès route"]
  }
]

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
      "name": "Propriétés",
      "item": "https://ophrus-immobilier.com/proprietes"
    }
  ]
}

const itemListStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Propriétés Immobilières Ophrus",
  "description": "Collection de propriétés immobilières de prestige au Congo-Brazzaville",
  "numberOfItems": properties.length,
  "itemListElement": properties.map((property, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "RealEstateListing",
      "name": property.title,
      "description": property.description,
      "url": `https://ophrus-immobilier.com/proprietes/${property.id}`,
      "image": property.images[0],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": property.location.split(', ')[1] || property.location,
        "addressRegion": property.location.split(', ')[0],
        "addressCountry": "CG"
      },
      "offers": {
        "@type": "Offer",
        "price": property.price,
        "priceCurrency": "XAF",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2025-12-31",
        "seller": {
          "@type": "RealEstateAgent",
          "name": "Ophrus Immobilier"
        }
      },
      "numberOfRooms": property.bedrooms,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.area,
        "unitCode": "SQM"
      }
    }
  }))
}

export default function PropertiesPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-CG', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      <StructuredData data={breadcrumbStructuredData} />
      <StructuredData data={itemListStructuredData} />
      
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
                <Link href="/proprietes" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
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
              <li className="text-gray-900 font-medium">Propriétés</li>
            </ol>
          </div>
        </nav>

        {/* Header */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nos Propriétés Premium
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez notre sélection exclusive de propriétés immobilières de prestige au Congo-Brazzaville. 
                Chaque bien est soigneusement sélectionné pour répondre aux plus hautes exigences.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white border-b py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Tous
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                Vente
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                Location
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                Maisons
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                Appartements
              </button>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <article key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-lg font-medium">Image de la propriété</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        property.type === 'Vente' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {property.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      <Link href={`/proprietes/${property.id}`} className="hover:text-blue-600 transition-colors">
                        {property.title}
                      </Link>
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" aria-hidden="true" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {property.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" aria-hidden="true" />
                          <span>{property.bedrooms} ch.</span>
                        </div>
                      )}
                      {property.bathrooms > 0 && (
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" aria-hidden="true" />
                          <span>{property.bathrooms} sdb</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" aria-hidden="true" />
                        <span>{property.area} m²</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatPrice(property.price)}
                        {property.type === 'Location' && <span className="text-sm text-gray-600">/mois</span>}
                      </div>
                      <Link 
                        href={`/proprietes/${property.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        aria-label={`Voir les détails de ${property.title}`}
                      >
                        Voir détails
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vous ne trouvez pas ce que vous cherchez ?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Notre équipe d'experts est là pour vous aider à trouver la propriété parfaite selon vos critères spécifiques.
            </p>
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Contactez-nous
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

