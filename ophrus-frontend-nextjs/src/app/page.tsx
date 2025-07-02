import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Home, TrendingUp, Users, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accueil - Trouvez votre propriété idéale',
  description: 'Découvrez des milliers de propriétés avec Ophrus. Recherche avancée, visites virtuelles et accompagnement personnalisé pour votre projet immobilier.',
  keywords: ['immobilier', 'propriété', 'achat', 'vente', 'location', 'appartement', 'maison'],
  openGraph: {
    title: 'Ophrus - Trouvez votre propriété idéale',
    description: 'Découvrez des milliers de propriétés avec Ophrus.',
    images: ['/images/hero-image.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container-custom py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Trouvez votre
                <span className="text-yellow-400"> propriété idéale</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Découvrez des milliers de propriétés avec notre plateforme moderne. 
                Recherche avancée, visites virtuelles et accompagnement personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/properties" className="btn-primary text-center">
                  Explorer les propriétés
                </Link>
                <Link href="/about" className="btn-secondary text-center">
                  En savoir plus
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/hero-property.jpg"
                alt="Propriété moderne avec vue panoramique"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Recherchez votre propriété
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      id="location"
                      placeholder="Ville, quartier..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    id="type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tous types</option>
                    <option value="apartment">Appartement</option>
                    <option value="house">Maison</option>
                    <option value="land">Terrain</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Prix max
                  </label>
                  <input
                    type="number"
                    id="price"
                    placeholder="Budget max"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-end">
                  <button className="w-full btn-primary flex items-center justify-center">
                    <Search className="h-4 w-4 mr-2" />
                    Rechercher
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Pourquoi choisir Ophrus ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme moderne qui révolutionne votre expérience immobilière
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Recherche Avancée</h3>
              <p className="text-gray-600">
                Filtres intelligents et géolocalisation pour trouver exactement ce que vous cherchez
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visites Virtuelles</h3>
              <p className="text-gray-600">
                Explorez les propriétés en 360° depuis chez vous avant de vous déplacer
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accompagnement Expert</h3>
              <p className="text-gray-600">
                Nos experts vous accompagnent à chaque étape de votre projet immobilier
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Propriétés disponibles</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-blue-200">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Villes couvertes</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-200">Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à trouver votre propriété idéale ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de personnes qui ont trouvé leur bonheur avec Ophrus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary">
              Créer un compte gratuit
            </Link>
            <Link href="/properties" className="btn-secondary">
              Explorer les propriétés
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

