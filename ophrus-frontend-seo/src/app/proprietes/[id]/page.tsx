import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Home, MapPin, Bed, Bath, Square, Phone, Mail, Calendar, Check } from 'lucide-react'
import StructuredData from '@/components/StructuredData'

// Données d'exemple pour les propriétés
const properties = [
  {
    id: 1,
    title: "Villa Moderne avec Piscine",
    description: "Magnifique villa contemporaine de 5 chambres avec piscine privée et jardin paysager. Cette propriété exceptionnelle offre un cadre de vie luxueux dans un quartier résidentiel prisé de Bacongo. La villa dispose d'espaces de vie généreux, d'une cuisine équipée haut de gamme, et d'un jardin paysager avec piscine. Idéale pour une famille recherchant le confort et l'élégance.",
    price: 250000000,
    type: "Vente",
    location: "Bacongo, Brazzaville",
    fullAddress: "123 Avenue des Palmiers, Bacongo, Brazzaville",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    landArea: 800,
    yearBuilt: 2020,
    images: ["/images/villa-moderne-1.jpg", "/images/villa-moderne-2.jpg"],
    features: ["Piscine", "Jardin paysager", "Garage 2 voitures", "Climatisation", "Sécurité 24h", "Cuisine équipée", "Terrasse"],
    energyClass: "B",
    propertyType: "Villa",
    coordinates: { lat: -4.2634, lng: 15.2429 }
  },
  {
    id: 2,
    title: "Appartement de Standing Centre-Ville",
    description: "Appartement luxueux de 3 pièces au cœur de Brazzaville avec vue panoramique sur le fleuve Congo. Situé dans une résidence moderne avec ascenseur et sécurité, cet appartement offre tout le confort moderne avec des finitions haut de gamme. Proche de tous les commerces et services.",
    price: 800000,
    type: "Location",
    location: "Centre-ville, Brazzaville",
    fullAddress: "456 Boulevard de l'Indépendance, Centre-ville, Brazzaville",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    landArea: 0,
    yearBuilt: 2018,
    images: ["/images/appartement-standing-1.jpg"],
    features: ["Vue panoramique", "Ascenseur", "Parking", "Climatisation", "Balcon", "Cuisine équipée"],
    energyClass: "A",
    propertyType: "Appartement",
    coordinates: { lat: -4.2634, lng: 15.2429 }
  }
]

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = properties.find(p => p.id === parseInt(params.id))
  
  if (!property) {
    return {
      title: 'Propriété non trouvée',
      description: 'La propriété que vous recherchez n\'existe pas ou n\'est plus disponible.'
    }
  }

  const priceFormatted = new Intl.NumberFormat('fr-CG', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price)

  return {
    title: `${property.title} - ${priceFormatted} | ${property.location}`,
    description: property.description.substring(0, 160) + '...',
    keywords: [
      property.propertyType.toLowerCase(),
      property.location.toLowerCase(),
      property.type.toLowerCase(),
      'immobilier Congo',
      'propriété Brazzaville'
    ],
    openGraph: {
      title: `${property.title} | Ophrus Immobilier`,
      description: property.description.substring(0, 160) + '...',
      url: `/proprietes/${property.id}`,
      images: [
        {
          url: property.images[0],
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.title} | Ophrus Immobilier`,
      description: property.description.substring(0, 160) + '...',
      images: [property.images[0]],
    },
  }
}

export default function PropertyDetailPage({ params }: Props) {
  const property = properties.find(p => p.id === parseInt(params.id))
  
  if (!property) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-CG', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
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
        "name": "Propriétés",
        "item": "https://ophrus-immobilier.com/proprietes"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": property.title,
        "item": `https://ophrus-immobilier.com/proprietes/${property.id}`
      }
    ]
  }

  const propertyStructuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "url": `https://ophrus-immobilier.com/proprietes/${property.id}`,
    "image": property.images,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.fullAddress.split(', ')[0],
      "addressLocality": property.location.split(', ')[1] || property.location,
      "addressRegion": property.location.split(', ')[0],
      "addressCountry": "CG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": property.coordinates.lat,
      "longitude": property.coordinates.lng
    },
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "XAF",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2025-12-31",
      "seller": {
        "@type": "RealEstateAgent",
        "name": "Ophrus Immobilier",
        "telephone": "+242 06 123 45 67",
        "email": "contact@ophrus-immobilier.com"
      }
    },
    "numberOfRooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.area,
      "unitCode": "SQM"
    },
    "lotSize": property.landArea > 0 ? {
      "@type": "QuantitativeValue",
      "value": property.landArea,
      "unitCode": "SQM"
    } : undefined,
    "yearBuilt": property.yearBuilt,
    "propertyType": `https://schema.org/${property.propertyType}`,
    "amenityFeature": property.features.map(feature => ({
      "@type": "LocationFeatureSpecification",
      "name": feature
    })),
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01"
  }

  return (
    <>
      <StructuredData data={breadcrumbStructuredData} />
      <StructuredData data={propertyStructuredData} />
      
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
              <li>
                <Link href="/proprietes" className="text-blue-600 hover:text-blue-700">
                  Propriétés
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-900 font-medium">{property.title}</li>
            </ol>
          </div>
        </nav>

        {/* Property Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Images */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="relative h-96">
                  <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-xl font-medium">Images de la propriété</span>
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
              </div>

              {/* Property Info */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="w-5 h-5 mr-2" aria-hidden="true" />
                  <span>{property.fullAddress}</span>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center">
                      <Bed className="w-5 h-5 mr-2 text-blue-600" aria-hidden="true" />
                      <div>
                        <div className="font-semibold">{property.bedrooms}</div>
                        <div className="text-sm text-gray-600">Chambres</div>
                      </div>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center">
                      <Bath className="w-5 h-5 mr-2 text-blue-600" aria-hidden="true" />
                      <div>
                        <div className="font-semibold">{property.bathrooms}</div>
                        <div className="text-sm text-gray-600">Salles de bain</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Square className="w-5 h-5 mr-2 text-blue-600" aria-hidden="true" />
                    <div>
                      <div className="font-semibold">{property.area} m²</div>
                      <div className="text-sm text-gray-600">Surface habitable</div>
                    </div>
                  </div>
                  {property.landArea > 0 && (
                    <div className="flex items-center">
                      <Square className="w-5 h-5 mr-2 text-blue-600" aria-hidden="true" />
                      <div>
                        <div className="font-semibold">{property.landArea} m²</div>
                        <div className="text-sm text-gray-600">Terrain</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-3xl font-bold text-blue-600 mb-6">
                  {formatPrice(property.price)}
                  {property.type === 'Location' && <span className="text-lg text-gray-600">/mois</span>}
                </div>

                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" aria-hidden="true" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Année de construction:</span> {property.yearBuilt}
                  </div>
                  <div>
                    <span className="font-medium">Type de bien:</span> {property.propertyType}
                  </div>
                  <div>
                    <span className="font-medium">Classe énergétique:</span> {property.energyClass}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold mb-4">Contactez-nous</h3>
                <p className="text-gray-600 mb-6">
                  Intéressé par cette propriété ? Contactez notre équipe pour plus d'informations ou pour organiser une visite.
                </p>
                
                <div className="space-y-4">
                  <a 
                    href="tel:+24206123456" 
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    aria-label="Appeler pour cette propriété"
                  >
                    <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                    +242 06 123 45 67
                  </a>
                  
                  <a 
                    href="mailto:contact@ophrus-immobilier.com?subject=Demande d'information - Villa Moderne avec Piscine" 
                    className="w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center"
                    aria-label="Envoyer un email pour cette propriété"
                  >
                    <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
                    Nous écrire
                  </a>
                  
                  <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                    <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
                    Planifier une visite
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-2">Référence</h4>
                  <p className="text-gray-600">OPHRUS-{property.id.toString().padStart(4, '0')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id.toString(),
  }))
}

