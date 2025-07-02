// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Types
export interface Property {
  _id: string;
  titre: string;
  description: string;
  prix: number;
  ville: string;
  adresse: string;
  nombre_chambres: number;
  nombre_salles_bain: number;
  superficie: number;
  images: string[];
  noteMoyenne: number;
  categorie: string;
  createdAt: string;
  garage?: boolean;
  piscine?: boolean;
  jardin?: boolean;
}

export interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: 'client' | 'agent' | 'admin';
  dateInscription: string;
  avatar?: string;
}

export interface Message {
  _id: string;
  expediteur: string;
  destinataire: string;
  sujet: string;
  message: string;
  date: string;
  lu: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API Helper Functions
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Une erreur est survenue' }));
    throw new Error(error.message || 'Une erreur est survenue');
  }
  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  register: async (userData: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  logout: async (): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return handleResponse(response);
  },

  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    });
    return handleResponse(response);
  }
};

// Properties API
export const propertiesAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    sortBy?: string;
  }): Promise<{ properties: Property[]; total: number; pages: number }> => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/properties?${queryParams}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getById: async (id: string): Promise<Property> => {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  create: async (propertyData: Omit<Property, '_id' | 'createdAt' | 'noteMoyenne'>): Promise<Property> => {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(propertyData)
    });
    return handleResponse(response);
  },

  update: async (id: string, propertyData: Partial<Property>): Promise<Property> => {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(propertyData)
    });
    return handleResponse(response);
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getFeatured: async (): Promise<Property[]> => {
    const response = await fetch(`${API_BASE_URL}/properties/featured`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getRecommended: async (userId: string): Promise<Property[]> => {
    const response = await fetch(`${API_BASE_URL}/properties/recommended/${userId}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Users API
export const usersAPI = {
  getProfile: async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/users/change-password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return handleResponse(response);
  },

  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/avatar`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData
    });
    return handleResponse(response);
  },

  getFavorites: async (): Promise<Property[]> => {
    const response = await fetch(`${API_BASE_URL}/users/favorites`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  addToFavorites: async (propertyId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/users/favorites/${propertyId}`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  removeFromFavorites: async (propertyId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/users/favorites/${propertyId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Messages API
export const messagesAPI = {
  getAll: async (): Promise<Message[]> => {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getById: async (id: string): Promise<Message> => {
    const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  send: async (messageData: {
    destinataire: string;
    sujet: string;
    message: string;
  }): Promise<Message> => {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(messageData)
    });
    return handleResponse(response);
  },

  markAsRead: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/messages/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Contact API
export const contactAPI = {
  send: async (contactData: {
    nom: string;
    email: string;
    telephone: string;
    sujet: string;
    message: string;
  }): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    return handleResponse(response);
  }
};

// Statistics API
export const statsAPI = {
  getDashboard: async (): Promise<{
    totalProperties: number;
    totalUsers: number;
    totalMessages: number;
    recentActivities: any[];
  }> => {
    const response = await fetch(`${API_BASE_URL}/stats/dashboard`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getUserStats: async (): Promise<{
    favorites: number;
    views: number;
    messages: number;
    properties: number;
  }> => {
    const response = await fetch(`${API_BASE_URL}/stats/user`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Upload API
export const uploadAPI = {
  uploadImages: async (files: File[]): Promise<{ urls: string[] }> => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });
    
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/upload/images`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData
    });
    return handleResponse(response);
  }
};

// Error handling utility
export const handleAPIError = (error: any) => {
  console.error('API Error:', error);
  
  if (error.message === 'Token expired' || error.message === 'Unauthorized') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    return;
  }
  
  return error.message || 'Une erreur est survenue';
};

// Local storage utilities
export const storage = {
  setToken: (token: string) => {
    localStorage.setItem('token', token);
  },
  
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  removeToken: () => {
    localStorage.removeItem('token');
  },
  
  setUser: (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  getUser: (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  removeUser: () => {
    localStorage.removeItem('user');
  },
  
  clear: () => {
    localStorage.removeItem('token');
    localStorage.removeUser('user');
  }
};

export default {
  auth: authAPI,
  properties: propertiesAPI,
  users: usersAPI,
  messages: messagesAPI,
  contact: contactAPI,
  stats: statsAPI,
  upload: uploadAPI
};

