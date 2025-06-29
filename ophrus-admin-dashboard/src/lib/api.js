const API_BASE_URL = 'http://localhost:5002/api';

// Configuration par défaut pour les requêtes
const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Fonction utilitaire pour les requêtes API
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Récupérer le token depuis le localStorage
  const token = localStorage.getItem('token');
  
  const config = {
    ...defaultConfig,
    ...options,
    headers: {
      ...defaultConfig.headers,
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Services d'authentification
export const authAPI = {
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  logout: async () => {
    return apiRequest('/users/logout', {
      method: 'POST',
    });
  },
  
  getProfile: async () => {
    return apiRequest('/users/profil');
  },
};

// Services d'administration
export const adminAPI = {
  // Dashboard
  getDashboardStats: async () => {
    return apiRequest('/admin/dashboard/stats');
  },
  
  // Propriétés
  getAllProperties: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/admin/properties${queryString ? `?${queryString}` : ''}`);
  },
  
  getPropertyById: async (id) => {
    return apiRequest(`/admin/properties/${id}`);
  },
  
  updatePropertyStatus: async (id, status) => {
    return apiRequest(`/admin/properties/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
  
  deleteProperty: async (id) => {
    return apiRequest(`/admin/properties/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Utilisateurs
  getAllUsers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/admin/users${queryString ? `?${queryString}` : ''}`);
  },
  
  getUserById: async (id) => {
    return apiRequest(`/admin/users/${id}`);
  },
  
  updateUser: async (id, userData) => {
    return apiRequest(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
  
  updateUserRole: async (id, role) => {
    return apiRequest(`/admin/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  },
  
  deleteUser: async (id) => {
    return apiRequest(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  },
  
  restoreUser: async (id) => {
    return apiRequest(`/admin/users/${id}/restore`, {
      method: 'PATCH',
    });
  },
  
  // Messages
  getAllMessages: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/admin/messages${queryString ? `?${queryString}` : ''}`);
  },
  
  getMessageById: async (id) => {
    return apiRequest(`/admin/messages/${id}`);
  },
  
  updateMessageStatus: async (id, isRead) => {
    return apiRequest(`/admin/messages/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ isRead }),
    });
  },
  
  deleteMessage: async (id) => {
    return apiRequest(`/admin/messages/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Analytics
  getPropertyAnalytics: async () => {
    return apiRequest('/admin/analytics/properties');
  },
  
  getUserAnalytics: async () => {
    return apiRequest('/admin/analytics/users');
  },
  
  getRevenueAnalytics: async () => {
    return apiRequest('/admin/analytics/revenue');
  },
  
  // Paramètres
  getSystemSettings: async () => {
    return apiRequest('/admin/settings');
  },
  
  updateSystemSettings: async (settings) => {
    return apiRequest('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },
};

// Service utilitaire pour vérifier si l'utilisateur est admin
export const checkAdminRole = async () => {
  try {
    const response = await authAPI.getProfile();
    return response.data?.role === 'admin';
  } catch (error) {
    console.error('Erreur lors de la vérification du rôle admin:', error);
    return false;
  }
};

export default {
  authAPI,
  adminAPI,
  checkAdminRole,
};

