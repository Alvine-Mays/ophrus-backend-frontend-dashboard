'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Grid, List, SortAsc, ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilters from '@/components/properties/PropertyFilters';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { cn } from '@/lib/utils';

// Mock data for demonstration
const mockProperties = [
  {
    _id: '1',
    title: 'Villa Moderne avec Piscine',
    description: 'Magnifique villa moderne avec piscine et jardin paysager',
    price: 450000000,
    currency: 'XAF',
    category: 'Villa',
    city: 'Pointe-Noire',
    bedrooms: 4,
    bathrooms: 3,
    surface: 250,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    rating: 4.8,
    featured: true,
    status: 'available'
  },
  {
    _id: '2',
    title: 'Appartement de Luxe Centre-ville',
    description: 'Appartement de standing en plein centre-ville',
    price: 180000000,
    currency: 'XAF',
    category: 'Appartement',
    city: 'Brazzaville',
    bedrooms: 3,
    bathrooms: 2,
    surface: 120,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    rating: 4.6,
    featured: true,
    status: 'available'
  },
  {
    _id: '3',
    title: 'Maison Familiale avec Jardin',
    description: 'Parfaite pour une famille nombreuse',
    price: 320000000,
    currency: 'XAF',
    category: 'Maison',
    city: 'Dolisie',
    bedrooms: 5,
    bathrooms: 3,
    surface: 200,
    images: ['https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    rating: 4.7,
    featured: false,
    status: 'available'
  },
  {
    _id: '4',
    title: 'Studio Moderne Centre-ville',
    description: 'Studio parfait pour jeunes professionnels',
    price: 85000000,
    currency: 'XAF',
    category: 'Studio',
    city: 'Brazzaville',
    bedrooms: 1,
    bathrooms: 1,
    surface: 45,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    rating: 4.3,
    featured: false,
    status: 'available'
  },
  {
    _id: '5',
    title: 'Duplex avec Terrasse',
    description: 'Duplex spacieux avec grande terrasse',
    price: 275000000,
    currency: 'XAF',
    category: 'Duplex',
    city: 'Pointe-Noire',
    bedrooms: 4,
    bathrooms: 2,
    surface: 180,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    rating: 4.5,
    featured: false,
    status: 'available'
  },
  {
    _id: '6',
    title: 'Penthouse de Luxe',
    description: 'Penthouse avec vue panoramique sur la ville',
    price: 650000000,
    currency: 'XAF',
    category: 'Penthouse',
    city: 'Brazzaville',
    bedrooms: 3,
    bathrooms: 3,
    surface: 220,
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    rating: 4.9,
    featured: true,
    status: 'available'
  }
];

const PropertiesPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [properties, setProperties] = useState(mockProperties);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date-desc');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    city: '',
    bedrooms: '',
    bathrooms: '',
  });
  
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: mockProperties.length,
    limit: 6
  });

  const sortOptions = [
    { value: 'date-desc', label: 'Plus récent' },
    { value: 'date-asc', label: 'Plus ancien' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'rating-desc', label: 'Mieux notés' },
    { value: 'surface-desc', label: 'Plus grande surface' },
  ];

  useEffect(() => {
    // Initialize filters from URL params
    const initialFilters = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      city: searchParams.get('city') || '',
      bedrooms: searchParams.get('bedrooms') || '',
      bathrooms: searchParams.get('bathrooms') || '',
    };

    setFilters(initialFilters);
    fetchProperties(1, initialFilters);
  }, [searchParams]);

  const fetchProperties = async (page = 1, currentFilters = filters) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Apply filters to mock data
    let filteredProperties = [...mockProperties];
    
    if (currentFilters.search) {
      filteredProperties = filteredProperties.filter(property =>
        property.title.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
        property.description.toLowerCase().includes(currentFilters.search.toLowerCase())
      );
    }
    
    if (currentFilters.category) {
      filteredProperties = filteredProperties.filter(property =>
        property.category === currentFilters.category
      );
    }
    
    if (currentFilters.city) {
      filteredProperties = filteredProperties.filter(property =>
        property.city === currentFilters.city
      );
    }
    
    if (currentFilters.minPrice) {
      filteredProperties = filteredProperties.filter(property =>
        property.price >= parseInt(currentFilters.minPrice)
      );
    }
    
    if (currentFilters.maxPrice) {
      filteredProperties = filteredProperties.filter(property =>
        property.price <= parseInt(currentFilters.maxPrice)
      );
    }
    
    if (currentFilters.bedrooms) {
      filteredProperties = filteredProperties.filter(property =>
        property.bedrooms >= parseInt(currentFilters.bedrooms)
      );
    }
    
    if (currentFilters.bathrooms) {
      filteredProperties = filteredProperties.filter(property =>
        property.bathrooms >= parseInt(currentFilters.bathrooms)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filteredProperties.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProperties.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filteredProperties.sort((a, b) => b.rating - a.rating);
        break;
      case 'surface-desc':
        filteredProperties.sort((a, b) => b.surface - a.surface);
        break;
      default:
        // Keep original order for date-desc
        break;
    }
    
    const limit = 6;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);
    
    setProperties(paginatedProperties);
    setPagination({
      page,
      totalPages: Math.ceil(filteredProperties.length / limit),
      total: filteredProperties.length,
      limit
    });
    
    setLoading(false);
  };

  const handlePageChange = (page: number) => {
    fetchProperties(page, filters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    fetchProperties(1, filters);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value as string);
      }
    });
    
    const newUrl = `/properties?${params.toString()}`;
    router.push(newUrl);
    
    fetchProperties(1, newFilters);
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {pages.map(page => (
          <Button
            key={page}
            variant={page === pagination.page ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handlePageChange(page)}
            className="min-w-[40px]"
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === pagination.totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos Propriétés
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez notre sélection de {pagination.total} propriétés exceptionnelles
          </p>
        </div>

        {/* Filters */}
        <PropertyFilters 
          className="mb-8" 
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            {/* Results Count */}
            <div className="text-gray-600">
              {loading ? (
                'Chargement...'
              ) : (
                `${pagination.total} propriété${pagination.total > 1 ? 's' : ''} trouvée${pagination.total > 1 ? 's' : ''}`
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    viewMode === 'grid'
                      ? 'bg-white text-blue-primary shadow-sm'
                      : 'text-gray-600 hover:text-blue-primary'
                  )}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    viewMode === 'list'
                      ? 'bg-white text-blue-primary shadow-sm'
                      : 'text-gray-600 hover:text-blue-primary'
                  )}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid/List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune propriété trouvée
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos critères de recherche pour voir plus de résultats.
            </p>
            <Button onClick={() => window.location.reload()}>
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <>
            <div
              className={cn(
                'grid gap-6',
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              )}
            >
              {properties.map((property, index) => (
                <div
                  key={property._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PropertyCard
                    property={property}
                    className={viewMode === 'list' ? 'flex flex-row' : ''}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {renderPagination()}
          </>
        )}

        {/* Load More Button (Alternative to pagination) */}
        {!loading && properties.length > 0 && pagination.page < pagination.totalPages && (
          <div className="text-center mt-8">
            <Button
              onClick={() => handlePageChange(pagination.page + 1)}
              size="lg"
              variant="outline"
            >
              Charger plus de propriétés
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;

