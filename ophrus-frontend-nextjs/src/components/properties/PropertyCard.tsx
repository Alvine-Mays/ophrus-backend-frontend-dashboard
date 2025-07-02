'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Bed, Bath, Square, Star, Eye } from 'lucide-react';
import { formatPrice, getImageUrl, getPropertyTypeIcon } from '../../lib/utils';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

interface PropertyCardProps {
  property: {
    _id: string;
    titre: string;
    prix: number;
    localisation?: string;
    ville?: string;
    type?: string;
    categorie?: string;
    chambres?: number;
    nombre_chambres?: number;
    sallesDeBain?: number;
    nombre_salles_bain?: number;
    superficie?: number;
    images?: Array<{ url: string }> | string[];
    noteMoyenne?: number;
    description?: string;
  };
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, className }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Normaliser les données de propriété pour gérer les différentes structures
  const normalizedProperty = {
    ...property,
    ville: property.ville || property.localisation || '',
    categorie: property.categorie || property.type || 'Autre',
    nombre_chambres: property.nombre_chambres || property.chambres || 0,
    nombre_salles_bain: property.nombre_salles_bain || property.sallesDeBain || 0,
  };

  const mainImage = Array.isArray(property.images) 
    ? (typeof property.images[0] === 'string' ? property.images[0] : property.images[0]?.url)
    : '/placeholder-property.jpg';

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setImageError(true);
  };

  return (
    <div className={cn('property-card group', className)}>
      {/* Image Container */}
      <div className="property-card-image">
        <Link href={`/properties/${property._id}`}>
          {isImageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">Chargement...</div>
            </div>
          )}
          <Image
            src={imageError ? '/placeholder-property.jpg' : (mainImage || '/placeholder-property.jpg')}
            alt={property.titre}
            width={400}
            height={300}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className="gradient-overlay" />
        </Link>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {/* Top Row */}
          <div className="flex justify-between items-start">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
              {getPropertyTypeIcon(normalizedProperty.categorie)} {normalizedProperty.categorie}
            </div>
            <button
              className="p-2 rounded-full bg-white bg-opacity-90 text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Row */}
          <div className="text-white">
            <div className="text-2xl font-bold mb-1">
              {formatPrice(property.prix)}
            </div>
            <div className="flex items-center space-x-1 text-sm opacity-90">
              <MapPin className="w-4 h-4" />
              <span>{normalizedProperty.ville}</span>
            </div>
          </div>
        </div>

        {/* View Button */}
        <Link
          href={`/properties/${property._id}`}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Button variant="primary" size="sm" className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Voir</span>
          </Button>
        </Link>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link href={`/properties/${property._id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-primary transition-colors line-clamp-2">
            {property.titre}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Features */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          {normalizedProperty.nombre_chambres > 0 && (
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4" />
              <span>{normalizedProperty.nombre_chambres}</span>
            </div>
          )}
          {normalizedProperty.nombre_salles_bain > 0 && (
            <div className="flex items-center space-x-1">
              <Bath className="w-4 h-4" />
              <span>{normalizedProperty.nombre_salles_bain}</span>
            </div>
          )}
          {property.superficie && property.superficie > 0 && (
            <div className="flex items-center space-x-1">
              <Square className="w-4 h-4" />
              <span>{property.superficie} m²</span>
            </div>
          )}
        </div>

        {/* Rating and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-blue-primary fill-current" />
            <span className="text-sm text-gray-600">
              {property.noteMoyenne ? property.noteMoyenne.toFixed(1) : 'N/A'}
            </span>
          </div>

          <Link href={`/properties/${property._id}`}>
            <Button variant="outline" size="sm">
              Détails
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

