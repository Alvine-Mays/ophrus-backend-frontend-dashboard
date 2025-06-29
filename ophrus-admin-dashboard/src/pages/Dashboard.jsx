import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Users, 
  TrendingUp, 
  Euro,
  Eye,
  MessageSquare,
  Calendar,
  MapPin
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { adminAPI } from '@/lib/api';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDashboardStats();
      
      if (response.success) {
        setDashboardData(response.data);
      } else {
        setError('Erreur lors du chargement des données');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchDashboardData}>Réessayer</Button>
        </div>
      </div>
    );
  }

  const { stats, topProperties, recentActivities, salesData, propertyTypes } = dashboardData;

  const statsCards = [
    {
      title: "Total Propriétés",
      value: stats.totalProperties.toLocaleString(),
      change: "12%",
      changeType: "positive",
      icon: Building,
      description: "par rapport au mois dernier"
    },
    {
      title: "Utilisateurs Actifs",
      value: stats.activeUsers.toLocaleString(),
      change: `+${stats.newUsersThisMonth}`,
      changeType: "positive",
      icon: Users,
      description: "nouveaux ce mois"
    },
    {
      title: "Messages",
      value: stats.totalMessages.toLocaleString(),
      change: stats.unreadMessages.toString(),
      changeType: stats.unreadMessages > 0 ? "negative" : "positive",
      icon: MessageSquare,
      description: stats.unreadMessages > 0 ? "non lus" : "tous lus"
    },
    {
      title: "Propriétés Actives",
      value: stats.activeProperties.toLocaleString(),
      change: `${stats.pendingProperties}`,
      changeType: "neutral",
      icon: Eye,
      description: "en attente"
    }
  ];

  const propertyTypesWithColors = propertyTypes.map((type, index) => ({
    ...type,
    color: ['#009fe3', '#00c4a7', '#ffa726', '#ef5350'][index % 4]
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de votre plateforme immobilière
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Ventes et Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="ventes" 
                  stroke="#009fe3" 
                  strokeWidth={2}
                  name="Ventes"
                />
                <Line 
                  type="monotone" 
                  dataKey="locations" 
                  stroke="#00c4a7" 
                  strokeWidth={2}
                  name="Locations"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Property Types Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Type de Propriété</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={propertyTypesWithColors}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {propertyTypesWithColors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Activités Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.time).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Properties */}
        <Card>
          <CardHeader>
            <CardTitle>Propriétés les Plus Vues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProperties.map((property) => (
                <div key={property._id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {property.titre}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{property.localisation}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">
                      €{property.prix?.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {property.views || 0}
                      </span>
                      <Badge 
                        variant={property.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {property.status === 'active' ? 'Actif' : 'En attente'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

