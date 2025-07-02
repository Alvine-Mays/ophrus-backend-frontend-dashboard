'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, MapPin, Star, Heart, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { formatPrice, filterProperties, sortProperties } from '@/lib/utils';

// Mock data for properties
const mockProperties = [
  {
    _id: '1',
    titre: 'Villa Moderne avec Piscine',
    description: 'Magnifique villa moderne avec piscine et jardin paysager dans un quartier résidentiel calme',
    prix: 450000000,
    ville: 'Pointe-Noire',
    adresse: 'Quartier Résidentiel',
    nombre_chambres: 4,
    nombre_salles_bain: 3,
    superficie: 250,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    noteMoyenne: 4.8,
    categorie: 'Villa',
    createdAt: '2024-01-15',
    garage: true,
    piscine: true,
    jardin: true
  },
  {
    _id: '2',
    titre: 'Appartement de Luxe Centre-ville',
    description: 'Appartement de standing en plein centre-ville avec vue panoramique',
    prix: 180000000,
    ville: 'Brazzaville',
    adresse: 'Centre-ville',
    nombre_chambres: 3,
    nombre_salles_bain: 2,
    superficie: 120,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    noteMoyenne: 4.6,
    categorie: 'Appartement',
    createdAt: '2024-01-10',
    garage: false,
    piscine: false,
    jardin: false
  },
  {
    _id: '3',
    titre: 'Maison Familiale avec Jardin',
    description: 'Parfaite pour une famille, avec grand jardin et espace de jeu pour enfants',
    prix: 320000000,
    ville: 'Dolisie',
    adresse: 'Quartier Familial',
    nombre_chambres: 5,
    nombre_salles_bain: 3,
    superficie: 200,
    images: ['https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    noteMoyenne: 4.7,
    categorie: 'Maison',
    createdAt: '2024-01-08',
    garage: true,
    piscine: false,
    jardin: true
  },
  {
    _id: '4',
    titre: 'Studio Moderne Étudiant',
    description: 'Studio parfait pour étudiant ou jeune professionnel, proche des universités',
    prix: 85000000,
    ville: 'Brazzaville',
    adresse: 'Quartier Universitaire',
    nombre_chambres: 1,
    nombre_salles_bain: 1,
    superficie: 35,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    noteMoyenne: 4.3,
    categorie: 'Studio',
    createdAt: '2024-01-05',
    garage: false,
    piscine: false,
    jardin: false
  },
  {
    _id: '5',
    titre: 'Terrain Constructible',
    description: 'Terrain de 1000m² dans zone résidentielle, idéal pour construction',
    prix: 120000000,
    ville: 'Pointe-Noire',
    adresse: 'Zone Résidentielle',
    nombre_chambres: 0,
    nombre_salles_bain: 0,
    superficie: 1000,
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    noteMoyenne: 4.5,
    categorie: 'Terrain',
    createdAt: '2024-01-03',
    garage: false,
    piscine: false,
    jardin: false
  },
  {
    _id: '6',
    titre: 'Local Commercial Centre-ville',
    description: 'Local commercial de 80m² en plein centre-ville, idéal pour commerce',
    prix: 200000000,
    ville: 'Brazzaville',
    adresse: 'Centre Commercial',
    nombre_chambres: 0,
    nombre_salles_bain: 1,
    superficie: 80,
    images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    noteMoyenne: 4.4,
    categorie: 'Commercial',
    createdAt: '2024-01-01',
    garage: false,
    piscine: false,
    jardin: false
  }
];

const PropertyCard = ({ property, viewMode }: { property: any; viewMode: 'grid' | 'list' }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex">
        <div className="w-1/3 relative">
          <img 
            src={property.images[0]} 
            alt={property.titre}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="primary">{property.categorie}</Badge>
          </div>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`absolute top-2 right-2 p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} hover:scale-110 transition-transform`}
          >
            <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{property.titre}</h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm text-gray-600">{property.noteMoyenne}</span>
            </div>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{property.ville}</span>
          </div>
          <p className="text-gray-600 mb-4">{property.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            {property.nombre_chambres > 0 && <span>{property.nombre_chambres} chambres</span>}
            {property.nombre_salles_bain > 0 && <span>{property.nombre_salles_bain} salles de bain</span>}
            <span>{property.superficie} m²</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-primary">
              {formatPrice(property.prix)}
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Eye className="w-4 h-4 mr-1" />
                Voir
              </Button>
              <Button size="sm">Contacter</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.titre}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="primary">{property.categorie}</Badge>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-2 right-2 p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} hover:scale-110 transition-transform`}
        >
          <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute bottom-2 right-2">
          <div className="flex items-center bg-white bg-opacity-90 rounded px-2 py-1">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{property.noteMoyenne}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.titre}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{property.ville}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {property.nombre_chambres > 0 && <span>{property.nombre_chambres} ch.</span>}
          {property.nombre_salles_bain > 0 && <span>{property.nombre_salles_bain} sdb</span>}
          <span>{property.superficie} m²</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-primary">
            {formatPrice(property.prix)}
          </div>
          <Button size="sm">Voir détails</Button>
        </div>
      </div>
    </div>
  );
};

const PropertiesPage = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    city: '',
    bedrooms: '',
    bathrooms: ''
  });
  
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    let filtered = filterProperties(properties, filters);
    filtered = sortProperties(filtered, sortBy);
    setFilteredProperties(filtered);
  }, [properties, filters, sortBy]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      city: '',
      bedrooms: '',
      bathrooms: ''
    });
  };

  const categories = ['Appartement', 'Maison', 'Villa', 'Studio', 'Terrain', 'Commercial'];
  const cities = ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Ouesso'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Toutes les Propriétés</h1>
          <p className="text-gray-600">Découvrez notre sélection de {filteredProperties.length} propriétés disponibles</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par titre, ville, description..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
              />
            </div>
            
            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-primary text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-primary text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-primary"
                >
                  <option value="">Toutes catégories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-primary"
                >
                  <option value="">Toutes villes</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Prix min (XAF)"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-primary"
                />

                <input
                  type="number"
                  placeholder="Prix max (XAF)"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-primary"
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-primary"
                  >
                    <option value="">Chambres</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-primary"
                  >
                    <option value="date-desc">Plus récent</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="rating-desc">Mieux notés</option>
                  </select>
                </div>

                <Button variant="ghost" onClick={clearFilters}>
                  Effacer filtres
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className={`${viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-6'
            }`}>
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property._id} 
                  property={property} 
                  viewMode={viewMode}
                />
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">Aucune propriété trouvée</div>
                <Button onClick={clearFilters}>Effacer les filtres</Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProperties.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <Button variant="outline" disabled>Précédent</Button>
                  <Button variant="primary">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Suivant</Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;

