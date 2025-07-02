import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Validation functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Congo phone number format: +242 XX XXX XX XX
  const phoneRegex = /^(\+242|242)?\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Formatting functions
export const formatPrice = (price: number, currency: string = 'XAF'): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

export const formatSurface = (surface: number): string => {
  return `${surface} m²`;
};

export const formatBedrooms = (bedrooms: number): string => {
  return bedrooms === 1 ? '1 chambre' : `${bedrooms} chambres`;
};

export const formatBathrooms = (bathrooms: number): string => {
  return bathrooms === 1 ? '1 salle de bain' : `${bathrooms} salles de bain`;
};

// Utility functions
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim('-'); // Remove leading/trailing hyphens
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Array utilities
export const sortByDate = <T extends { createdAt?: string | Date }>(
  items: T[],
  order: 'asc' | 'desc' = 'desc'
): T[] => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const sortByPrice = <T extends { price?: number }>(
  items: T[],
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...items].sort((a, b) => {
    const priceA = a.price || 0;
    const priceB = b.price || 0;
    return order === 'asc' ? priceA - priceB : priceB - priceA;
  });
};

export const filterByCategory = <T extends { category?: string }>(
  items: T[],
  category: string
): T[] => {
  if (!category) return items;
  return items.filter(item => item.category === category);
};

export const filterByPriceRange = <T extends { price?: number }>(
  items: T[],
  minPrice?: number,
  maxPrice?: number
): T[] => {
  return items.filter(item => {
    const price = item.price || 0;
    if (minPrice && price < minPrice) return false;
    if (maxPrice && price > maxPrice) return false;
    return true;
  });
};

export const searchItems = <T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!searchTerm) return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(term);
      }
      return false;
    })
  );
};

// Local storage utilities
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
};

export const removeFromStorage = (key: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Image utilities
export const getImageUrl = (imagePath: string, size?: 'thumb' | 'medium' | 'large'): string => {
  if (!imagePath) return '/images/placeholder.jpg';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // Add size suffix if specified
  if (size && !imagePath.includes('unsplash')) {
    const extension = imagePath.split('.').pop();
    const basePath = imagePath.replace(`.${extension}`, '');
    return `/images/${basePath}_${size}.${extension}`;
  }
  
  return imagePath.startsWith('/') ? imagePath : `/images/${imagePath}`;
};

// Error handling
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'Une erreur inattendue s\'est produite';
};

// URL utilities
export const buildUrl = (base: string, params: Record<string, any>): string => {
  const url = new URL(base, window.location.origin);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });
  
  return url.toString();
};

export const getQueryParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  
  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(window.location.search);
  
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
};

