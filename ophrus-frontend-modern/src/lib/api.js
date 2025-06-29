import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/users/login', { email, password }),
  register: (userData) => api.post('/users/register', userData),
  logout: () => api.post('/users/logout'),
  getProfile: () => api.get('/users/profil'),
  updateProfile: (userData) => api.put(`/users/${userData.id}`, userData),
  refreshToken: () => api.post('/users/refresh-token'),
  requestPasswordReset: (email) => api.post('/users/reset-request', { email }),
  verifyResetCode: (email, code) => api.post('/users/reset-verify', { email, code }),
  resetPassword: (email, code, newPassword) => 
    api.post('/users/reset-password', { email, code, newPassword }),
};

// Property API
export const propertyAPI = {
  getAll: (params = {}) => api.get('/properties', { params }),
  getById: (id) => api.get(`/properties/${id}`),
  create: (propertyData) => {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(propertyData).forEach(key => {
      if (key !== 'images') {
        formData.append(key, propertyData[key]);
      }
    });
    
    // Add images
    if (propertyData.images && propertyData.images.length > 0) {
      propertyData.images.forEach(image => {
        formData.append('images', image);
      });
    }
    
    return api.post('/properties', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (id, propertyData) => {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(propertyData).forEach(key => {
      if (key !== 'images') {
        formData.append(key, propertyData[key]);
      }
    });
    
    // Add images
    if (propertyData.images && propertyData.images.length > 0) {
      propertyData.images.forEach(image => {
        formData.append('images', image);
      });
    }
    
    return api.put(`/properties/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (id) => api.delete(`/properties/${id}`),
  toggleFavorite: (id) => api.post(`/properties/favoris/${id}`),
  rate: (id, rating) => api.post(`/properties/rate/${id}`, { note: rating }),
  getWithRating: (id) => api.get(`/properties/rating/${id}`),
};

// Message API
export const messageAPI = {
  getInbox: () => api.get('/messages/inbox'),
  getMessagesWithUser: (userId) => api.get(`/messages/${userId}`),
  sendMessage: (receiverId, content) => api.post(`/messages/${receiverId}`, { contenu: content }),
  contactOphrus: (subject, content) => api.post('/messages/ophrus', { sujet: subject, contenu: content }),
  getUnreadCount: () => api.get('/messages/unread'),
  markAsRead: (messageId) => api.patch(`/messages/${messageId}/read`),
  markThreadAsRead: (userId) => api.patch(`/messages/thread/${userId}/read`),
  getAll: () => api.get('/messages'),
  getById: (id) => api.get(`/messages/${id}`),
  create: (messageData) => api.post('/messages', messageData),
  update: (id, messageData) => api.put(`/messages/${id}`, messageData),
  delete: (id) => api.delete(`/messages/${id}`),
};

// HTTP method exports for direct use
export const get = (url, config) => api.get(url, config);
export const post = (url, data, config) => api.post(url, data, config);
export const put = (url, data, config) => api.put(url, data, config);
export const patch = (url, data, config) => api.patch(url, data, config);
export const del = (url, config) => api.delete(url, config);

// Favorites API
export const favoritesAPI = {
  getAll: () => api.get('/favoris'),
  add: (propertyId) => api.post('/favoris', { propertyId }),
  remove: (propertyId) => api.delete(`/favoris/${propertyId}`),
};

// Utility functions
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors du téléchargement de l\'image');
  }
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export default api;

