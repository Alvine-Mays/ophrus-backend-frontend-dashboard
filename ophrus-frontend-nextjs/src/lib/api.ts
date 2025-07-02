// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Types
export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  surface: number;
  images: string[];
  rating: number;
  featured: boolean;
  status: 'available' | 'sold' | 'rented';
  views?: number;
  favorites?: number;
  createdAt: string;
  updatedAt: string;
  owner: string;
}

export interface User {
  _id: string;
  nom: string;
  email: string;
  telephone: string;
  role: 'user' | 'agent' | 'admin';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  subject: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  nom: string;
  email: string;
  telephone: string;
  password: string;
}

export interface PropertyFilters {
  search?: string;
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  featured?: boolean;
  status?: string;
}

// API Client
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    
    // Get token from localStorage on client side
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  removeToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Auth endpoints
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse<null>> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.request('/auth/profile');
  }

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Property endpoints
  async getProperties(
    page: number = 1,
    limit: number = 12,
    filters: PropertyFilters = {}
  ): Promise<ApiResponse<Property[]>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
      ),
    });

    return this.request(`/properties?${params}`);
  }

  async getProperty(id: string): Promise<ApiResponse<Property>> {
    return this.request(`/properties/${id}`);
  }

  async createProperty(propertyData: Omit<Property, '_id' | 'createdAt' | 'updatedAt' | 'owner'>): Promise<ApiResponse<Property>> {
    return this.request('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
  }

  async updateProperty(id: string, propertyData: Partial<Property>): Promise<ApiResponse<Property>> {
    return this.request(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    });
  }

  async deleteProperty(id: string): Promise<ApiResponse<null>> {
    return this.request(`/properties/${id}`, {
      method: 'DELETE',
    });
  }

  async getFeaturedProperties(): Promise<ApiResponse<Property[]>> {
    return this.request('/properties/featured');
  }

  async getUserProperties(page: number = 1, limit: number = 12): Promise<ApiResponse<Property[]>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    return this.request(`/properties/user?${params}`);
  }

  async toggleFavorite(propertyId: string): Promise<ApiResponse<{ isFavorite: boolean }>> {
    return this.request(`/properties/${propertyId}/favorite`, {
      method: 'POST',
    });
  }

  async getFavorites(): Promise<ApiResponse<Property[]>> {
    return this.request('/properties/favorites');
  }

  // Message endpoints
  async getMessages(page: number = 1, limit: number = 20): Promise<ApiResponse<Message[]>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    return this.request(`/messages?${params}`);
  }

  async sendMessage(messageData: {
    senderName: string;
    senderEmail: string;
    senderPhone?: string;
    subject: string;
    message: string;
    propertyId?: string;
  }): Promise<ApiResponse<Message>> {
    return this.request('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  async markMessageAsRead(messageId: string): Promise<ApiResponse<Message>> {
    return this.request(`/messages/${messageId}/read`, {
      method: 'PUT',
    });
  }

  async deleteMessage(messageId: string): Promise<ApiResponse<null>> {
    return this.request(`/messages/${messageId}`, {
      method: 'DELETE',
    });
  }

  // Statistics endpoints
  async getStats(): Promise<ApiResponse<{
    totalProperties: number;
    totalViews: number;
    totalFavorites: number;
    totalMessages: number;
    monthlyRevenue: number;
    averageRating: number;
  }>> {
    return this.request('/stats');
  }

  async getPropertyViews(propertyId: string): Promise<ApiResponse<{ views: number }>> {
    return this.request(`/properties/${propertyId}/views`);
  }

  // File upload endpoints
  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('image', file);

    return this.request('/upload/image', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }

  async uploadImages(files: File[]): Promise<ApiResponse<{ urls: string[] }>> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });

    return this.request('/upload/images', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }
}

// Create API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Convenience functions
export const authApi = {
  login: (credentials: LoginCredentials) => apiClient.login(credentials),
  register: (userData: RegisterData) => apiClient.register(userData),
  logout: () => apiClient.logout(),
  getProfile: () => apiClient.getProfile(),
  updateProfile: (userData: Partial<User>) => apiClient.updateProfile(userData),
  setToken: (token: string) => apiClient.setToken(token),
  removeToken: () => apiClient.removeToken(),
};

export const propertyApi = {
  getAll: (page?: number, limit?: number, filters?: PropertyFilters) => 
    apiClient.getProperties(page, limit, filters),
  getById: (id: string) => apiClient.getProperty(id),
  create: (data: Omit<Property, '_id' | 'createdAt' | 'updatedAt' | 'owner'>) => 
    apiClient.createProperty(data),
  update: (id: string, data: Partial<Property>) => apiClient.updateProperty(id, data),
  delete: (id: string) => apiClient.deleteProperty(id),
  getFeatured: () => apiClient.getFeaturedProperties(),
  getUserProperties: (page?: number, limit?: number) => 
    apiClient.getUserProperties(page, limit),
  toggleFavorite: (id: string) => apiClient.toggleFavorite(id),
  getFavorites: () => apiClient.getFavorites(),
  getViews: (id: string) => apiClient.getPropertyViews(id),
};

export const messageApi = {
  getAll: (page?: number, limit?: number) => apiClient.getMessages(page, limit),
  send: (data: {
    senderName: string;
    senderEmail: string;
    senderPhone?: string;
    subject: string;
    message: string;
    propertyId?: string;
  }) => apiClient.sendMessage(data),
  markAsRead: (id: string) => apiClient.markMessageAsRead(id),
  delete: (id: string) => apiClient.deleteMessage(id),
};

export const statsApi = {
  getStats: () => apiClient.getStats(),
};

export const uploadApi = {
  uploadImage: (file: File) => apiClient.uploadImage(file),
  uploadImages: (files: File[]) => apiClient.uploadImages(files),
};

// Error handling utility
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'Une erreur inattendue s\'est produite';
};

export default apiClient;

