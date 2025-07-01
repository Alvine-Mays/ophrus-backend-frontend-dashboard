import React from 'react';
import { 
  Home, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Eye,
  DollarSign,
  Calendar,
  Activity
} from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon,
  loading = false 
}) => {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-bold text-gray-900">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        
        {change && (
          <div className={`flex items-center text-sm ${changeColors[changeType]}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const StatsCards = ({ stats, loading = false }) => {
  const statsConfig = [
    {
      key: 'totalProperties',
      title: 'Total Propriétés',
      icon: Home,
      change: stats?.propertiesChange,
      changeType: stats?.propertiesChange?.startsWith('+') ? 'positive' : 'negative'
    },
    {
      key: 'totalUsers',
      title: 'Utilisateurs',
      icon: Users,
      change: stats?.usersChange,
      changeType: stats?.usersChange?.startsWith('+') ? 'positive' : 'negative'
    },
    {
      key: 'totalMessages',
      title: 'Messages',
      icon: MessageSquare,
      change: stats?.messagesChange,
      changeType: stats?.messagesChange?.startsWith('+') ? 'positive' : 'negative'
    },
    {
      key: 'totalViews',
      title: 'Vues ce mois',
      icon: Eye,
      change: stats?.viewsChange,
      changeType: stats?.viewsChange?.startsWith('+') ? 'positive' : 'negative'
    },
    {
      key: 'revenue',
      title: 'Revenus (CFA)',
      icon: DollarSign,
      change: stats?.revenueChange,
      changeType: stats?.revenueChange?.startsWith('+') ? 'positive' : 'negative'
    },
    {
      key: 'activeListings',
      title: 'Annonces Actives',
      icon: Activity,
      change: stats?.activeListingsChange,
      changeType: stats?.activeListingsChange?.startsWith('+') ? 'positive' : 'negative'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsConfig.map((config) => (
        <StatsCard
          key={config.key}
          title={config.title}
          value={stats?.[config.key] || 0}
          change={config.change}
          changeType={config.changeType}
          icon={config.icon}
          loading={loading}
        />
      ))}
    </div>
  );
};

// Composant pour les statistiques détaillées
export const DetailedStatsCard = ({ 
  title, 
  data = [], 
  loading = false,
  className = '' 
}) => {
  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{item.label}</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">
                {item.value}
              </span>
              {item.change && (
                <span className={`text-xs ${
                  item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant pour les métriques en temps réel
export const RealTimeMetrics = ({ metrics, loading = false }) => {
  const metricsConfig = [
    {
      key: 'onlineUsers',
      title: 'Utilisateurs en ligne',
      icon: Users,
      color: 'text-green-600'
    },
    {
      key: 'todayViews',
      title: 'Vues aujourd\'hui',
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      key: 'newMessages',
      title: 'Nouveaux messages',
      icon: MessageSquare,
      color: 'text-orange-600'
    },
    {
      key: 'newProperties',
      title: 'Nouvelles propriétés',
      icon: Home,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Métriques en temps réel
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {metricsConfig.map((config) => (
          <div key={config.key} className="text-center">
            <config.icon className={`w-8 h-8 mx-auto mb-2 ${config.color}`} />
            <p className="text-2xl font-bold text-gray-900">
              {loading ? (
                <span className="inline-block w-8 h-6 bg-gray-200 rounded animate-pulse"></span>
              ) : (
                metrics?.[config.key] || 0
              )}
            </p>
            <p className="text-sm text-gray-600">{config.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;

