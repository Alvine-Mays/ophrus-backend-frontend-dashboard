'use client';

import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface PropertyFiltersProps {
  className?: string;
  filters: {
    search: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    city: string;
    bedrooms: string;
    bathrooms: string;
  };
  onFiltersChange: (filters: any) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ 
  className, 
  filters, 
  onFiltersChange 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { value: '', label: 'Tous les types' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Appartement', label: 'Appartement' },
    { value: 'Maison', label: 'Maison' },
    { value: 'Studio', label: 'Studio' },
    { value: 'Duplex', label: 'Duplex' },
    { value: 'Penthouse', label: 'Penthouse' },
    { value: 'Terrain', label: 'Terrain' },
  ];

  const cities = [
    { value: '', label: 'Toutes les villes' },
    { value: 'Brazzaville', label: 'Brazzaville' },
    { value: 'Pointe-Noire', label: 'Pointe-Noire' },
    { value: 'Dolisie', label: 'Dolisie' },
    { value: 'Nkayi', label: 'Nkayi' },
    { value: 'Ouesso', label: 'Ouesso' },
    { value: 'Madingou', label: 'Madingou' },
  ];

  const bedroomOptions = [
    { value: '', label: 'Toutes' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' },
  ];

  const bathroomOptions = [
    { value: '', label: 'Toutes' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
  ];

  const handleInputChange = (field: string, value: string) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    
    // For search, apply immediately
    if (field === 'search') {
      onFiltersChange(newFilters);
    }
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    setIsExpanded(false);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      city: '',
      bedrooms: '',
      bathrooms: '',
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some(value => value !== '');

  return (
    <div className={cn('bg-white rounded-lg shadow-sm', className)}>
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher par titre, description, ville..."
            value={localFilters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-primary transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filtres avancés</span>
            {hasActiveFilters && (
              <span className="bg-blue-primary text-white text-xs px-2 py-1 rounded-full">
                {Object.values(localFilters).filter(value => value !== '').length}
              </span>
            )}
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="text-sm">Réinitialiser</span>
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de propriété
              </label>
              <select
                value={localFilters.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville
              </label>
              <select
                value={localFilters.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chambres
              </label>
              <select
                value={localFilters.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
              >
                {bedroomOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salles de bain
              </label>
              <select
                value={localFilters.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
              >
                {bathroomOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix minimum (XAF)
              </label>
              <input
                type="number"
                placeholder="Ex: 50000000"
                value={localFilters.minPrice}
                onChange={(e) => handleInputChange('minPrice', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix maximum (XAF)
              </label>
              <input
                type="number"
                placeholder="Ex: 500000000"
                value={localFilters.maxPrice}
                onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(false)}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleApplyFilters}
            >
              Appliquer les filtres
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;

