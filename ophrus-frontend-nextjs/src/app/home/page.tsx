'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, TrendingUp, Shield, Award, ArrowRight, Star, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { formatPrice } from '@/lib/utils';

// Mock data for featured properties
const mockFeaturedProperties = [
  {
    _id: '1',
    titre: 'Villa Moderne avec Piscine',
    description: 'Magnifique villa moderne avec piscine et jardin paysager',
    prix: 450000000,
    ville: 'Pointe-Noire',
    nombre_chambres: 4,
    nombre_salles_bain: 3,
    superficie: 250,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    noteMoyenne: 4.8,
    categorie: 'Villa'
  },
  {
    _id: '2',
    titre: 'Appartement de Luxe Centre-ville',
    description: 'Appartement de standing en plein centre-ville',
    prix: 180000000,
    ville: 'Brazzaville',
    nombre_chambres: 3,
    nombre_salles_bain: 2,
    superficie: 120,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    noteMoyenne: 4.6,
    categorie: 'Appartement'
  },
  {
    _id: '3',
    titre: 'Maison Familiale avec Jardin',
    description: 'Parfaite pour une famille, avec grand jardin',
    prix: 320000000,
    ville: 'Dolisie',
    nombre_chambres: 5,
    nombre_salles_bain: 3,
    superficie: 200,
    images: ['https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    noteMoyenne: 4.7,
    categorie: 'Maison'
  }
];

// Simple PropertyCard component
const PropertyCard = ({ property }: { property: any }) => (
  <div className="property-card">
    <div className="property-card-image">
      <img src={property.images[0]} alt={property.titre} />
      <div className="gradient-overlay"></div>
      <div className="absolute top-4 left-4">
        <span className="bg-blue-primary text-white px-2 py-1 rounded text-sm font-medium">
          {property.categorie}
        </span>
      </div>
      <div className="absolute top-4 right-4">
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
        <span>{property.nombre_chambres} chambres</span>
        <span>{property.nombre_salles_bain} salles de bain</span>
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

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredProperties, setFeaturedProperties] = useState(mockFeaturedProperties);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/properties?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const stats = [
    { icon: TrendingUp, label: 'Propriétés vendues', value: '500+' },
    { icon: Shield, label: 'Clients satisfaits', value: '98%' },
    { icon: Award, label: 'Années d\'expérience', value: '15+' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Recherche Avancée',
      description: 'Trouvez la propriété parfaite grâce à nos filtres intelligents et notre moteur de recherche puissant.',
    },
    {
      icon: Shield,
      title: 'Transactions Sécurisées',
      description: 'Toutes nos transactions sont sécurisées et accompagnées par des professionnels certifiés.',
    },
    {
      icon: Award,
      title: 'Expertise Reconnue',
      description: 'Notre équipe d\'experts vous accompagne à chaque étape de votre projet immobilier.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          }}
        ></div>
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Trouvez Votre
              <span className="text-luxury block mt-2">Propriété de Rêve</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
              Découvrez une sélection exclusive de propriétés exceptionnelles avec Ophrus Immobilier, 
              votre partenaire de confiance depuis plus de 15 ans.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8 animate-scale-in">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Rechercher par ville, type de propriété..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-32 py-4 text-lg rounded-xl border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-primary"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  Rechercher
                </Button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link href="/properties">
                <Button size="lg" className="w-full sm:w-auto">
                  Voir toutes les propriétés
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white bg-opacity-10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-primary to-blue-dark rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Propriétés en Vedette
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de propriétés exceptionnelles, choisies pour leur qualité et leur emplacement privilégié.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProperties.map((property, index) => (
                <div key={property._id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link href="/properties">
              <Button size="lg">
                Voir toutes les propriétés
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir Ophrus ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nous mettons notre expertise et notre passion au service de vos projets immobiliers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-primary to-blue-dark rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-primary to-blue-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à Commencer Votre Recherche ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers de clients satisfaits et trouvez la propriété de vos rêves dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-blue-primary hover:bg-gray-100">
                Créer un compte
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-primary">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

