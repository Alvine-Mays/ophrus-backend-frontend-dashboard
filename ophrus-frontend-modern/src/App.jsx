import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PropertyProvider } from './contexts/PropertyContext';
import { MessageProvider } from './contexts/MessageContext';
import { Toaster } from 'react-hot-toast';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import AddPropertyPage from './pages/AddPropertyPage';
import EditPropertyPage from './pages/EditPropertyPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import MessagesPage from './pages/MessagesPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Component
import ProtectedRoute from './components/auth/ProtectedRoute';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <MessageProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/properties" element={<PropertiesPage />} />
                  <Route path="/properties/:id" element={<PropertyDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/favorites" element={
                    <ProtectedRoute>
                      <FavoritesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/messages" element={
                    <ProtectedRoute>
                      <MessagesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/add-property" element={
                    <ProtectedRoute>
                      <AddPropertyPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/edit-property/:id" element={
                    <ProtectedRoute>
                      <EditPropertyPage />
                    </ProtectedRoute>
                  } />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    style: {
                      background: '#10b981',
                    },
                  },
                  error: {
                    style: {
                      background: '#ef4444',
                    },
                  },
                }}
              />
            </div>
          </Router>
        </MessageProvider>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;

