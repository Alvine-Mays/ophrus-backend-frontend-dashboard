import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, MapPin, Bed, Bath, Square, Heart, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Propriétés à vendre et à louer - Trouvez votre bien immobilier',
  description: 'Découvrez notre sélection de propriétés à vendre et à louer. Appartements, maisons, terrains - Recherche avancée et visites virtuelles disponibles.',
  keywords: ['propriétés', 'immobilier', 'appartement', 'maison', 'vente', 'location', 'achat'],
  openGraph: {
    title: 'Propriétés disponibles - Ophrus',
    description: 'Découvrez notre sélection de propriétés à vendre et à louer.',
    images: ['/images/properties-og.jpg'],
  },
  alternates: {
    canonical: '/properties',
  },
};

// Données simulées - à remplacer par votre API
const properties = [
  {
    id: 1,
    title: 'Appartement moderne avec vue sur mer',
    location: 'Nice, Alpes-Maritimes',
    price: 450000,
    type: 'Appartement',
    bedrooms: 3,
    bathrooms: 2,
    area: 85,
    image: '/images/property-1.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'Maison familiale avec jardin',
    location: 'Lyon, Rhône',
    price: 320000,
    type: 'Maison',
    bedrooms: 4,
    bathrooms: 2,
    area: 120,
    image: '/images/property-2.jpg',
    featured: false,
  },
  {
    id: 3,
    title: 'Studio rénové centre-ville',
    location: 'Paris 11ème, Paris',
    price: 280000,
    type: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    image: '/images/property-3.jpg',
    featured: true,
  },
  {
    id: 4,
    title: 'Villa avec piscine',
    location: 'Cannes, Alpes-Maritimes',
    price: 850000,
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 3,
    area: 200,
    image: '/images/property-4.jpg',
    featured: false,
  },
  {
    id: 5,
    title: 'Loft industriel rénové',
    location: 'Marseille, Bouches-du-Rhône',
    price: 380000,
    type: 'Loft',
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    image: '/images/property-5.jpg',
    featured: true,
  },
  {
    id: 6,
    title: 'Appartement neuf avec terrasse',
    location: 'Toulouse, Haute-Garonne',
    price: 295000,
    type: 'Appartement',
    bedrooms: 3,
    bathrooms: 1,
    area: 75,
    image: '/images/property-6.jpg',
    featured: false,
  },
];

function PropertyCard({ property }: { property: typeof properties[0] }) {
  return (
    <article className="card group hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Image
          src={property.image}
          alt={property.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {property.featured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            À la une
          </div>
        )}
        <button
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
          aria-label="Ajouter aux favoris"
        >
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">{property.type}</span>
          <span className="text-2xl font-bold text-gray-900">
            {property.price.toLocaleString('fr-FR')} €
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{property.area} m²</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link
            href={`/properties/${property.id}`}
            className="flex-1 btn-primary text-center text-sm"
          >
            Voir détails
          </Link>
          <button
            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            aria-label="Visite virtuelle"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Propriétés
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de propriétés soigneusement choisies pour vous
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filtres */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtres
              </h2>
              
              <div className="space-y-6">
                {/* Type de propriété */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de propriété
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Tous types</option>
                    <option value="apartment">Appartement</option>
                    <option value="house">Maison</option>
                    <option value="villa">Villa</option>
                    <option value="studio">Studio</option>
                    <option value="loft">Loft</option>
                  </select>
                </div>

                {/* Prix */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Localisation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation
                  </label>
                  <input
                    type="text"
                    placeholder="Ville, département..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Chambres */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de chambres
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Indifférent</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                {/* Surface */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surface (m²)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button className="w-full btn-primary">
                  Appliquer les filtres
                </button>
              </div>
            </div>
          </aside>

          {/* Liste des propriétés */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">{properties.length}</span> propriétés trouvées
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <label htmlFor="sort" className="text-sm text-gray-600">
                  Trier par:
                </label>
                <select
                  id="sort"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="date-desc">Plus récent</option>
                  <option value="area-desc">Surface décroissante</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2" aria-label="Pagination">
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">
                  Précédent
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-md">1</button>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  Suivant
                </button>
              </nav>
            </div>
          </main>
        </div>
      </div>

      {/* Schema.org JSON-LD pour les propriétés */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Propriétés immobilières disponibles',
            description: 'Liste des propriétés à vendre et à louer sur Ophrus',
            numberOfItems: properties.length,
            itemListElement: properties.map((property, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'RealEstate',
                name: property.title,
                description: `${property.type} de ${property.area}m² avec ${property.bedrooms} chambres`,
                address: property.location,
                offers: {
                  '@type': 'Offer',
                  price: property.price,
                  priceCurrency: 'EUR',
                },
              },
            })),
          }),
        }}
      />
    </div>
  );
}

