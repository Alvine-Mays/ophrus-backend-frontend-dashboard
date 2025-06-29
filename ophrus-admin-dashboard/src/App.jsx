import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <AuthProvider>
      <Router>
        <ProtectedRoute>
          <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <Sidebar 
              isCollapsed={sidebarCollapsed} 
              onToggle={toggleSidebar}
            />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <Header 
                onToggleSidebar={toggleSidebar}
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
              />
              
              {/* Page Content */}
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Navigate to="/admin" replace />} />
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/properties" element={<div className="p-6"><h1 className="text-2xl font-bold">Gestion des Propriétés</h1><p className="text-muted-foreground">Page en cours de développement...</p></div>} />
                  <Route path="/admin/users" element={<div className="p-6"><h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1><p className="text-muted-foreground">Page en cours de développement...</p></div>} />
                  <Route path="/admin/messages" element={<div className="p-6"><h1 className="text-2xl font-bold">Gestion des Messages</h1><p className="text-muted-foreground">Page en cours de développement...</p></div>} />
                  <Route path="/admin/analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics</h1><p className="text-muted-foreground">Page en cours de développement...</p></div>} />
                  <Route path="/admin/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Paramètres</h1><p className="text-muted-foreground">Page en cours de développement...</p></div>} />
                </Routes>
              </main>
            </div>
          </div>
        </ProtectedRoute>
      </Router>
    </AuthProvider>
  );
}

export default App;

