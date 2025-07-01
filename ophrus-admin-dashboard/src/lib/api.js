import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

// Configuration d'axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et erreurs
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    const errorMessage = error.response?.data?.message || error.message || 'Une erreur est survenue';
    return Promise.reject(new Error(errorMessage));
  }
);

// Services d'authentification
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser: async () => {
    return await api.get('/auth/me');
  },

  refreshToken: async () => {
    return await api.post('/auth/refresh');
  }
};

// Services des propriétés
export const propertiesAPI = {
  getAll: async (params = {}) => {
    return await api.get('/properties', { params });
  },

  getById: async (id) => {
    return await api.get(`/properties/${id}`);
  },

  create: async (propertyData) => {
    return await api.post('/properties', propertyData);
  },

  update: async (id, propertyData) => {
    return await api.put(`/properties/${id}`, propertyData);
  },

  delete: async (id) => {
    return await api.delete(`/properties/${id}`);
  },

  uploadImages: async (id, formData) => {
    return await api.post(`/properties/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteImage: async (propertyId, imageId) => {
    return await api.delete(`/properties/${propertyId}/images/${imageId}`);
  },

  getStats: async () => {
    return await api.get('/properties/stats');
  }
};

// Services des utilisateurs
export const usersAPI = {
  getAll: async (params = {}) => {
    return await api.get('/users', { params });
  },

  getById: async (id) => {
    return await api.get(`/users/${id}`);
  },

  create: async (userData) => {
    return await api.post('/users', userData);
  },

  update: async (id, userData) => {
    return await api.put(`/users/${id}`, userData);
  },

  delete: async (id) => {
    return await api.delete(`/users/${id}`);
  },

  updateRole: async (id, role) => {
    return await api.patch(`/users/${id}/role`, { role });
  },

  getStats: async () => {
    return await api.get('/users/stats');
  }
};

// Services des messages/contacts
export const messagesAPI = {
  getAll: async (params = {}) => {
    return await api.get('/messages', { params });
  },

  getById: async (id) => {
    return await api.get(`/messages/${id}`);
  },

  markAsRead: async (id) => {
    return await api.patch(`/messages/${id}/read`);
  },

  reply: async (id, replyData) => {
    return await api.post(`/messages/${id}/reply`, replyData);
  },

  delete: async (id) => {
    return await api.delete(`/messages/${id}`);
  },

  getStats: async () => {
    return await api.get('/messages/stats');
  }
};

// Services d'analytics
export const analyticsAPI = {
  getDashboardStats: async () => {
    return await api.get('/analytics/dashboard');
  },

  getPropertyViews: async (period = '30d') => {
    return await api.get('/analytics/property-views', { params: { period } });
  },

  getUserActivity: async (period = '30d') => {
    return await api.get('/analytics/user-activity', { params: { period } });
  },

  getSearchStats: async (period = '30d') => {
    return await api.get('/analytics/search-stats', { params: { period } });
  },

  getRevenueStats: async (period = '30d') => {
    return await api.get('/analytics/revenue', { params: { period } });
  }
};

// Services de configuration
export const settingsAPI = {
  getAll: async () => {
    return await api.get('/settings');
  },

  update: async (settings) => {
    return await api.put('/settings', settings);
  },

  uploadLogo: async (formData) => {
    return await api.post('/settings/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

// Services de sauvegarde
export const backupAPI = {
  create: async () => {
    return await api.post('/backup/create');
  },

  getAll: async () => {
    return await api.get('/backup/list');
  },

  restore: async (backupId) => {
    return await api.post(`/backup/restore/${backupId}`);
  },

  delete: async (backupId) => {
    return await api.delete(`/backup/${backupId}`);
  },

  download: async (backupId) => {
    const response = await api.get(`/backup/download/${backupId}`, {
      responseType: 'blob'
    });
    return response;
  }
};

// Services de logs
export const logsAPI = {
  getAll: async (params = {}) => {
    return await api.get('/logs', { params });
  },

  getByLevel: async (level, params = {}) => {
    return await api.get(`/logs/level/${level}`, { params });
  },

  clear: async () => {
    return await api.delete('/logs');
  }
};

export default api;

