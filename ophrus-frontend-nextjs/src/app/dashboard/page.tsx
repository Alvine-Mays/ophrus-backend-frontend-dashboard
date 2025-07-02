'use client';

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Heart, 
  Eye, 
  MessageSquare, 
  Settings, 
  User, 
  TrendingUp, 
  Calendar,
  Bell,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { formatPrice, formatDate } from '@/lib/utils';

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setUser({
        id: '1',
        nom: 'Jean',
        prenom: 'Dupont',
        email: 'jean.dupont@email.com',
        telephone: '+242 06 123 45 67',
        role: 'client',
        dateInscription: '2024-01-15',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      });
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    { icon: Heart, label: 'Favoris', value: '12', color: 'text-red-500' },
    { icon: Eye, label: 'Vues', value: '45', color: 'text-blue-500' },
    { icon: MessageSquare, label: 'Messages', value: '8', color: 'text-green-500' },
    { icon: Home, label: 'Mes annonces', value: '3', color: 'text-purple-500' },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'favorite',
      title: 'Villa Moderne avec Piscine',
      description: 'Ajouté aux favoris',
      date: '2024-01-20',
      icon: Heart,
      color: 'text-red-500'
    },
    {
      id: 2,
      type: 'view',
      title: 'Appartement de Luxe Centre-ville',
      description: 'Propriété consultée',
      date: '2024-01-19',
      icon: Eye,
      color: 'text-blue-500'
    },
    {
      id: 3,
      type: 'message',
      title: 'Message de Marie NGOMA',
      description: 'Nouveau message reçu',
      date: '2024-01-18',
      icon: MessageSquare,
      color: 'text-green-500'
    }
  ];

  const favoriteProperties = [
    {
      id: '1',
      titre: 'Villa Moderne avec Piscine',
      prix: 450000000,
      ville: 'Pointe-Noire',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      dateAjout: '2024-01-20'
    },
    {
      id: '2',
      titre: 'Appartement de Luxe Centre-ville',
      prix: 180000000,
      ville: 'Brazzaville',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      dateAjout: '2024-01-18'
    }
  ];

  const messages = [
    {
      id: 1,
      expediteur: 'Marie NGOMA',
      sujet: 'Visite de la villa',
      message: 'Bonjour, je souhaiterais organiser une visite de la villa que vous avez mise en favoris.',
      date: '2024-01-20',
      lu: false
    },
    {
      id: 2,
      expediteur: 'Paul MAKAYA',
      sujet: 'Estimation de votre bien',
      message: 'Nous avons terminé l\'estimation de votre propriété. Le rapport est disponible.',
      date: '2024-01-19',
      lu: true
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={`${user.prenom} ${user.nom}`}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Bonjour, {user.prenom} !
                </h1>
                <p className="text-gray-600">
                  Membre depuis {formatDate(user.dateInscription)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
                { id: 'favorites', label: 'Mes Favoris', icon: Heart },
                { id: 'messages', label: 'Messages', icon: MessageSquare },
                { id: 'properties', label: 'Mes Annonces', icon: Home },
                { id: 'profile', label: 'Profil', icon: User }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-primary text-blue-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Activité Récente</h2>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-full bg-white ${activity.color}`}>
                          <activity.icon className="w-4 h-4" />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(activity.date)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommandations</h2>
                  <div className="bg-gradient-to-r from-blue-primary to-blue-dark rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Nouvelles propriétés disponibles</h3>
                    <p className="mb-4 opacity-90">
                      Découvrez 5 nouvelles propriétés qui correspondent à vos critères de recherche.
                    </p>
                    <Button variant="secondary" className="bg-white text-blue-primary hover:bg-gray-100">
                      Voir les recommandations
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Mes Favoris</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Rechercher dans mes favoris..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrer
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteProperties.map((property) => (
                    <div key={property.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.titre}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{property.titre}</h3>
                        <p className="text-gray-600 mb-2">{property.ville}</p>
                        <p className="text-xl font-bold text-blue-primary mb-3">
                          {formatPrice(property.prix)}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Ajouté le {formatDate(property.dateAjout)}
                          </span>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau message
                  </Button>
                </div>

                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border rounded-lg ${
                        !message.lu ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-gray-900">{message.expediteur}</h3>
                          {!message.lu && (
                            <Badge variant="primary" className="ml-2">Nouveau</Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(message.date)}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-800 mb-2">{message.sujet}</h4>
                      <p className="text-gray-600">{message.message}</p>
                      <div className="mt-3 flex space-x-2">
                        <Button size="sm">Répondre</Button>
                        <Button size="sm" variant="outline">Marquer comme lu</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Mes Annonces</h2>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle annonce
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucune annonce publiée
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Commencez à vendre ou louer vos propriétés en créant votre première annonce.
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Créer ma première annonce
                  </Button>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Mon Profil</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photo de profil
                      </label>
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.avatar}
                          alt="Avatar"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <Button variant="outline" size="sm">
                          Changer la photo
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prénom
                        </label>
                        <input
                          type="text"
                          value={user.prenom}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom
                        </label>
                        <input
                          type="text"
                          value={user.nom}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={user.telephone}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button>
                        <Edit className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                      <Button variant="outline">Annuler</Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Préférences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Notifications par email</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Notifications push</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Newsletter</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Sécurité</h3>
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full">
                          Changer le mot de passe
                        </Button>
                        <Button variant="outline" className="w-full">
                          Authentification à deux facteurs
                        </Button>
                        <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50">
                          Supprimer le compte
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

