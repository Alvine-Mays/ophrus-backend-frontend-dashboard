'use client';

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Plus, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Settings,
  Eye,
  Heart,
  Star,
  Calendar,
  DollarSign,
  BarChart3
} from 'lucide-react';
import Button from '@/components/ui/Button';
import PropertyCard from '@/components/properties/PropertyCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Mock data for demonstration
const mockStats = {
  totalProperties: 12,
  totalViews: 1847,
  totalFavorites: 234,
  totalMessages: 18,
  monthlyRevenue: 2450000,
  averageRating: 4.7
};

const mockRecentProperties = [
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
    status: 'available',
    views: 156,
    favorites: 23,
    createdAt: '2024-01-15'
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
    status: 'available',
    views: 89,
    favorites: 12,
    createdAt: '2024-01-10'
  }
];

const mockRecentMessages = [
  {
    id: '1',
    senderName: 'Marie Dubois',
    subject: 'Intéressée par la villa à Pointe-Noire',
    message: 'Bonjour, je suis très intéressée par votre villa avec piscine...',
    propertyTitle: 'Villa Moderne avec Piscine',
    createdAt: '2024-01-20T10:30:00Z',
    isRead: false
  },
  {
    id: '2',
    senderName: 'Jean Makaya',
    subject: 'Demande de visite',
    message: 'Pourriez-vous organiser une visite pour l\'appartement...',
    propertyTitle: 'Appartement de Luxe Centre-ville',
    createdAt: '2024-01-19T15:45:00Z',
    isRead: true
  },
  {
    id: '3',
    senderName: 'Sophie Ngoma',
    subject: 'Question sur le prix',
    message: 'Le prix est-il négociable pour cette propriété ?',
    propertyTitle: 'Maison Familiale avec Jardin',
    createdAt: '2024-01-18T09:15:00Z',
    isRead: false
  }
];

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(mockStats);
  const [recentProperties, setRecentProperties] = useState(mockRecentProperties);
  const [recentMessages, setRecentMessages] = useState(mockRecentMessages);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h1>
          <p className="text-gray-600">
            Gérez vos propriétés et suivez vos performances
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Button className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Ajouter une propriété</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Messages ({recentMessages.filter(m => !m.isRead).length})</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Statistiques</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Paramètres</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Propriétés</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vues totales</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favoris</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFavorites}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus</p>
                <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.monthlyRevenue)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Note moyenne</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}/5</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Properties */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Propriétés récentes
              </h2>
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentProperties.map((property) => (
                <div key={property._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-500">{property.city}</p>
                      <p className="text-sm font-semibold text-blue-600">
                        {formatPrice(property.price)}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {property.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {property.favorites}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Messages récents
              </h2>
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`border border-gray-200 rounded-lg p-4 ${
                    !message.isRead ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {message.senderName}
                        </h3>
                        {!message.isRead && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{message.subject}</p>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {message.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatDate(message.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Performance des vues
          </h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-2" />
              <p>Graphique des performances</p>
              <p className="text-sm">Intégration avec Chart.js à venir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

